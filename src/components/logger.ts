// Imports.
import { EventEmitter } from 'events';
import winston from 'winston';

export default class Logger {
    private events: EventEmitter;
    private logger: winston.Logger;
    private format: winston.Logform.Format = winston.format.printf(info => {
        return `${info.timestamp} - [${info.level}] ${info.message}`;
    });
    constructor(events: EventEmitter) {
        this.events = events;
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), this.format),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'discord-bot.log' }),
            ],
        });
        this.events.on('logger', this.log.bind(this));
    }
    log = (level: string, message: string, shouldExit?: boolean): void => {
        this.logger.log({
            level: level,
            message: message,
        });
        if (shouldExit) {
            process.exit(1);
        }
    };
}
