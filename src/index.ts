// Entrypoint.
import 'dotenv/config';
import { EventEmitter } from 'events';
import { Client, Intents } from 'discord.js';
import { Logger, Blacklist, Watcher, Discord } from './components';

const events = new EventEmitter();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

(async () => {
    const logger = new Logger(events);
    await client.login(process.env.TOKEN).catch(err => {
        logger.log('error', `Unable to log in. Error: ${err}`, true);
        return;
    });
    logger.log('info', 'Starting components...');
    const blacklist = new Blacklist(events);
    await blacklist.init();
    const watcher = new Watcher(events);
    await watcher.init();
    //@ts-ignore
    const discord = new Discord(events, client);
})();
