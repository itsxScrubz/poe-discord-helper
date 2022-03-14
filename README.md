# Standalone discord bot to notify you of trades.

This is something I'm building into the trade overlay I'm working on.  
I figured I'd release this version incase anyone wants to use it seperately.

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

# Running

Just open up the command prompt, cd into the directory, and `yarn start` or `npm run start` and you're good to go!!  
You could also make a bat file to handle this. User preference I guess... ^\_^
