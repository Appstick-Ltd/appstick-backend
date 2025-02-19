import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, userId, method, path, statusCode, responseTime, ...meta }) => {
      let log = `${timestamp} ${level}: ${message}`;
      if (userId) log += ` [User: ${userId}]`;
      if (method && path) log += ` [${method} ${path}]`;
      if (statusCode) log += ` [Status: ${statusCode}]`;
      if (responseTime) log += ` [Response Time: ${responseTime}ms]`;
      if (Object.keys(meta).length > 0) log += ` ${JSON.stringify(meta)}`;
      return log;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export { logger };