#!/bin/bash
#
# ZeroCode App Start/Restart Script
# Usage: ./start.sh [options]
#
# Options:
#   --help, -h     Show help information
#   --logs, -l     Show logs after starting
#   --port=XXXX    Specify custom port (default: 3000)
#

# Set script to exit on any error
set -e

# Configuration
APP_NAME="ZeroCode App"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${APP_DIR}/logs"
LOG_FILE="${LOG_DIR}/app.log"
PID_FILE="${APP_DIR}/.app.pid"
DEFAULT_PORT=3000
NODE_ENV=${NODE_ENV:-"development"}

# Parse command line arguments
RESTART=true # Always restart
SHOW_LOGS=false
CUSTOM_PORT=$DEFAULT_PORT

for arg in "$@"
do
    case $arg in
        --help|-h)
            echo "Usage: ./start.sh [options]"
            echo ""
            echo "Options:"
            echo "  --help, -h     Show help information"
            echo "  --logs, -l     Show logs after starting"
            echo "  --port=XXXX    Specify custom port (default: ${DEFAULT_PORT})"
            exit 0
            ;;
        --logs|-l)
            SHOW_LOGS=true
            shift
            ;;
        --port=*)
            CUSTOM_PORT="${arg#*=}"
            if ! [[ "$CUSTOM_PORT" =~ ^[0-9]+$ ]]; then
                echo "Error: Port must be a number"
                exit 1
            fi
            shift
            ;;
        *)
            # Unknown option
            echo "Unknown option: $arg"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Log function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Check if port is in use
check_port_in_use() {
    if lsof -i :"$CUSTOM_PORT" > /dev/null 2>&1; then
        return 0 # Port is in use
    fi
    return 1 # Port is not in use
}

# Free up port if in use
free_port() {
    if check_port_in_use; then
        log "Port $CUSTOM_PORT is in use. Attempting to free it..."
        # Get PIDs of processes using the port
        PIDS=$(lsof -t -i:"$CUSTOM_PORT" 2>/dev/null)
        if [ -n "$PIDS" ]; then
            log "Killing processes: $PIDS"
            for PID in $PIDS; do
                # Try graceful shutdown first
                kill -15 "$PID" 2>/dev/null || true
                
                # Wait briefly for process to terminate
                TIMEOUT=5
                COUNT=0
                while ps -p "$PID" > /dev/null 2>&1; do
                    if [ $COUNT -ge $TIMEOUT ]; then
                        log "Forcefully terminating process $PID after $TIMEOUT seconds..."
                        kill -9 "$PID" 2>/dev/null || true
                        break
                    fi
                    sleep 1
                    COUNT=$((COUNT+1))
                done
            done
            
            # Verify port is free
            sleep 1
            if check_port_in_use; then
                log "Failed to free port $CUSTOM_PORT. Please check manually."
                return 1
            else
                log "Successfully freed port $CUSTOM_PORT"
                return 0
            fi
        fi
    fi
    return 0 # Port is already free
}

# Check if app is already running
check_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            return 0 # App is running
        else
            log "Found stale PID file. Removing..."
            rm -f "$PID_FILE"
        fi
    fi
    return 1 # App is not running
}

# Stop the app
stop_app() {
    # First stop by PID if available
    if check_running; then
        PID=$(cat "$PID_FILE")
        log "Stopping $APP_NAME (PID: $PID)..."
        
        # Try graceful shutdown first
        kill -15 "$PID" 2>/dev/null || true
        
        # Wait for process to terminate
        TIMEOUT=30
        COUNT=0
        while ps -p "$PID" > /dev/null 2>&1; do
            if [ $COUNT -ge $TIMEOUT ]; then
                log "Forcefully terminating process after $TIMEOUT seconds..."
                kill -9 "$PID" 2>/dev/null || true
                break
            fi
            sleep 1
            COUNT=$((COUNT+1))
        done
        
        rm -f "$PID_FILE"
        log "$APP_NAME stopped successfully"
    else
        log "$APP_NAME process not found in PID file"
    fi
    
    # Always make sure port is free (in case app was started outside of this script)
    free_port
}

# Start the app
start_app() {
    log "Starting $APP_NAME on port $CUSTOM_PORT..."
    
    # Ensure port is free before starting
    free_port || {
        log "Could not free port $CUSTOM_PORT. Cannot start application."
        exit 1
    }
    
    # Check if node_modules exists
    if [ ! -d "${APP_DIR}/node_modules" ]; then
        log "node_modules not found. Installing dependencies..."
        cd "$APP_DIR" && npm install
    fi
    
    # Set port in environment variable
    export PORT="$CUSTOM_PORT"
    
    # Start the app
    cd "$APP_DIR"
    
    # Check if this is a React app with react-scripts
    if grep -q "react-scripts start" package.json; then
        # Start in background, redirect output to log file
        PORT="$CUSTOM_PORT" npm start > "$LOG_FILE" 2>&1 &
        
        # Save PID
        echo $! > "$PID_FILE"
        
        # Wait a bit and check if process is still running
        sleep 3
        if ! ps -p "$(cat "$PID_FILE")" > /dev/null 2>&1; then
            log "Failed to start $APP_NAME. Check logs for details."
            exit 1
        fi
    else
        # Try to detect the right start command
        if [ -f "package.json" ]; then
            if grep -q "\"start\":" package.json; then
                PORT="$CUSTOM_PORT" npm start > "$LOG_FILE" 2>&1 &
                echo $! > "$PID_FILE"
            elif [ -f "server.js" ]; then
                PORT="$CUSTOM_PORT" node server.js > "$LOG_FILE" 2>&1 &
                echo $! > "$PID_FILE"
            else
                log "Could not determine how to start the application"
                exit 1
            fi
        else
            log "No package.json found. Cannot start the application."
            exit 1
        fi
    fi
    
    log "$APP_NAME started successfully on port $CUSTOM_PORT with PID $(cat "$PID_FILE")"
    
    # Verify the app is running on the port
    sleep 3
    if ! check_port_in_use; then
        log "Warning: No process detected on port $CUSTOM_PORT. The app might have failed to start."
    else
        log "Verified: Port $CUSTOM_PORT is active"
    fi
}

# Main execution
if check_running; then
    log "Restarting $APP_NAME..."
    stop_app
    start_app
else
    log "Starting $APP_NAME as a new instance..."
    start_app
fi

# Show logs if requested
if [ "$SHOW_LOGS" = true ]; then
    log "Showing logs..."
    tail -f "$LOG_FILE"
fi

log "Script completed successfully"
