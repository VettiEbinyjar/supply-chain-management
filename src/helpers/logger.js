const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ]
});

module.exports = logger;
