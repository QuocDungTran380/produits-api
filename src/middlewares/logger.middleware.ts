import winston from "winston";

export const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.cli()
        )
      }),
      new winston.transports.File({ filename: 'logs/errors.log' })
    ]
  });
  
  export const infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.cli()
        )
      }),
      new winston.transports.File({ filename: 'logs/infos.log' })
    ]
  });

  export const warnLogger = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.cli()
        )
      }),
      new winston.transports.File({ filename: 'logs/warnings.log' })
    ]
  });
