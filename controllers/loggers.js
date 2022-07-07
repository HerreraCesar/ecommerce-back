import winston from "winston";

export const requestLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({level: 'info'})
    ]
  })
  
  export const logger404 = winston.createLogger({
    transports: [
      new winston.transports.Console({level: 'warn'}),
      new winston.transports.File({filename: './logs/warn.log', level: 'warn'})
    ]
  })
  
  export const errorLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({level: 'error'}),
      new winston.transports.File({filename: './logs/error.log', level: 'error'})
    ]
  })