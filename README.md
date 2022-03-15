# POE-Discord-Helper.

This is a discord bot that scans Path of Exile's client.txt logfile and sends you a message or pings a channel in discord when you recieve a trade request ingame. This does **NOT** detect if you're afk or not. The idea was to just run the bot, and afk from PoE but still get notified of a trade request.

This is not something I plan on adding more features to, since I will be integrating it (along with more features) into the trade overlay I'm working on.

\*\*NOTE\*\*  
This bot DOES check the TFT blacklist, and will add `Warning! This player is blacklisted on TFT.` to the message.  
I only have it set to work with the whispers from the official trade site. I'm somewhat new to poe still, so I'm not sure about other sites and what their whispers may look like.

There is a section for languages. If you would like to add to it just make a pull request.  
There is an ru section, but no it is not translated.

# Discord Setup

Head over to the [Discord dev panel](https://discord.com/developers/applications).  
Click `New Application` and enter a name.  
Write down the `Application ID` listed inside `General Information`.  
Select `Bot` on the left hand side.  
Select `Add Bot`.  
Write down the token provided. If you see `Reset Token` instead, just hit that and copy the new one.  
Enter this link in your browser `https://discord.com/api/oauth2/authorize?client_id=<id>&scope=bot` but replace `<id>` with the `Application ID` you wrote down and invite the bot into your server.

# Bot Setup

Install node if you don't have it installed already.  
CD into the directory, and run `yarn install` or `npm install` if you prefer npm.  
Create a `.env` file in the root directory.  
Paste in `DISCORD_TOKEN=your.token.here` and insert your token.  
You will need the following:

-   Your discord user id.
-   ID of the channel you want the bot to post in.

You can get these inside discord via Rightclick => Copy ID.  
If you don't see this option, go to Settings => Advanced and turn on Developer Mode.  
Go to `src/components/config.ts`. and set your user id and channel id.  
Setting `DirectMessage` to true inside the config will have the bot direct message you instead of tagging you inside a channel.

# Running

Just open up the command prompt, cd into the directory, and `yarn start` or `npm run start` and you're good to go!!  
You could also make a bat file to handle this. User preference I guess... ^\_^
