// Blacklist Stoofs.
import { EventEmitter } from 'events';
import axios from 'axios';

const url =
    'https://raw.githubusercontent.com/The-Forbidden-Trove/character_name_blacklist/main/blacklist.txt';

export default class Blacklist {
    private events: EventEmitter;
    private blacklist: string[] = [];
    private getList = async (): Promise<string[]> => {
        const list = await axios.get(url).catch(err => {
            this.events.emit(
                'logger',
                'error',
                `Unable to download blacklist from ${url} with error =>\n${err}`,
                true,
            );
            return;
        });
        return list?.data.split('\n');
    };
    constructor(events: EventEmitter) {
        this.events = events;
        this.events.on('blacklistCheck', this.nameCheck.bind(this));
    }
    init = async (): Promise<void> => {
        this.blacklist = await this.getList();
        this.loop();
        this.events.emit('logger', 'info', 'TFT blacklist fetched.');
    };
    nameCheck = (name: string, line: string): void => {
        const isBlacklisted = this.blacklist.includes(name);
        this.events.emit('newTrade', line, isBlacklisted);
    };
    private loop = () => {
        setTimeout(async (): Promise<void> => {
            this.blacklist = await this.getList();
            this.loop();
        }, 300000);
    };
}
