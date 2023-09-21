const fs = require('fs');
const path = require('path');

class FileLogger {
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
    this.logLevels = ['info', 'warn', 'error']; // Default log levels
  }

  setLogLevels(levels) {
    this.logLevels = levels;
  }

  log(level, message) {
    if (this.logLevels.includes(level)) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      this.appendLog(logMessage);
    }
  }

  logRequest(req) {
    const logMessage = `${req.method} ${req.url}`;
    this.log('info', logMessage);
  }

  logResponse(res) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] Response sent with status ${res.statusCode}`;
    this.appendLog(logMessage);
  }

  appendLog(message) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }
}

module.exports = FileLogger;
