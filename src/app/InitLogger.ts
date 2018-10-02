import { Logger } from 'winston';
import { createLogger, format, transports } from 'winston';

export default class InitLogger {

    public init(): Logger {
        let logger = createLogger({
            format: format.json(),
            transports: [
                new transports.File({ filename: 'logs/error.log', level: 'error' }),
                new transports.File({ filename: 'logs/combined.log' }),
            ],
        });

        logger.add(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.simple(),
            ),
        }));

        logger = this.fixLogger(logger);

        return logger;
    }

    /**
     * temporary solution to bypass problem
     * of don't logging stacktrace
     */
    private fixLogger(logger: Logger) {
        const fn = logger.error;
        logger.error = function () {
            const error: Error = arguments[0];
            arguments[0] = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);

            return fn.apply(this, arguments);
        };

        return logger;
    }
}
