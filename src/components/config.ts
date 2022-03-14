type Config = {
    Lang: 'en' | 'ru';
    DirectMessage: boolean;
    Discord: {
        UserID: string;
        Message: string;
        ChannelID: string;
    };
};

const Config: Config = {
    Lang: 'en',
    DirectMessage: false,
    Discord: {
        UserID: '207767925401059331',
        Message: 'Trade request just recieved for:',
        ChannelID: '952744519961550861',
    },
};

export default Config;
