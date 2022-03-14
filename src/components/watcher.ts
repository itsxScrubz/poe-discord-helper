// Imports.
import { EventEmitter } from 'events';
import find from 'find-process';
import chokidar from 'chokidar';
import { readLastLines } from 'read-last-lines-ts';
import Config from './config';
import Lang from './lang';

export default class Watcher {
    private events: EventEmitter;
    private location: string = '';
    private watcher: chokidar.FSWatcher | undefined;
    private exeNames = [
        'PathOfExileSteam',
        'PathOfExile_x64Steam',
        'PathOfExile',
        'PathOfExile_x64',
    ];
    constructor(events: EventEmitter) {
        this.events = events;
    }
    private fetchLocation = async (): Promise<boolean> => {
        let found = false;
        this.exeNames.forEach(async value => {
            const location = await find('name', value);
            if (location.length > 0) {
                this.location = location[1].cmd.replace(`${value}.exe`, 'logs\\client.txt');
                found = true;
            }
        });
        return found;
    };
    init = async (): Promise<void> => {
        const found = await this.fetchLocation();
        if (!found) {
            this.events.emit(
                'logger',
                'error',
                "Unable to find Path of Exile exe location or the game isn't running.",
                true,
            );
            return;
        }
        this.watcher = chokidar.watch(this.location);
        this.watcher.on('change', () => {
            const newLine = readLastLines(this.location, 1).toString();
            if (
                newLine.includes(Lang[Config.Lang].recieved) &&
                newLine.includes(Lang[Config.Lang].isTrade)
            ) {
                const format = newLine.split(' ');
                const start = format.indexOf(Lang[Config.Lang].recieved);
                const end = format.indexOf(Lang[Config.Lang].buffer[2]);
                const name =
                    end - start > 1
                        ? `${format[start + 1]} ${format[start + 2]}`
                        : format[start + 1];
                this.events.emit('blacklistCheck', name, format);
            }
        });
        this.events.emit('logger', 'info', 'Watching client.txt file.');
    };
}
