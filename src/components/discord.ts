// Imports.
import { Client, TextChannel } from 'discord.js';
import { EventEmitter } from 'events';
import Config from './config';
import Lang from './lang';

// Events.
export default class Discord {
    private events: EventEmitter;
    private client: Client;
    //@ts-ignore
    private channel: TextChannel;
    constructor(events: EventEmitter, client: Client) {
        this.events = events;
        this.client = client;
        const newChannel = this.client.channels.cache.get(Config.Discord.ChannelID);
        if (!newChannel) {
            this.events.emit(
                'logger',
                'error',
                `Channel ID ${Config.Discord.ChannelID} is not a valid channel.`,
                true,
            );
            return;
        }
        if (newChannel.type !== 'GUILD_TEXT') {
            this.events.emit(
                'logger',
                'error',
                `Channel ID ${Config.Discord.ChannelID} is not a text channel.`,
                true,
            );
            return;
        }
        this.channel = newChannel;
        this.events.on('newTrade', this.sendToDiscord.bind(this));
        this.events.emit('logger', 'info', 'Bot ready to go!');
    }
    sendToDiscord = async (data: string[], isBlacklisted?: boolean): Promise<void> => {
        const start = data.indexOf(Lang[Config.Lang].buffer[0]);
        const end = data.indexOf(Lang[Config.Lang].buffer[1]);
        let item = '';
        for (let i = start + 1; i < end; i++) {
            item = item + ` ${data[i]}`;
        }
        item = item.trim();
        const priceStart = end + Lang[Config.Lang].step;
        const price = `${data[priceStart]} ${data[priceStart + 1]}`;
        const message = `${Config.Discord.Message} ${item} - ${price}${
            isBlacklisted ? '\nWarning! This player is blacklisted on TFT.' : ''
        }`;
        if (Config.DirectMessage) {
            await this.client.users.fetch(Config.Discord.UserID).then(user => {
                user.send(message);
            });
        } else {
            await this.channel.send(`<@${Config.Discord.UserID}> ${message}`);
        }
        this.events.emit(
            'logger',
            'info',
            `The following message was sent to channel ${Config.Discord.ChannelID}: ${message}`,
        );
    };
}
