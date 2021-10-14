import {Client} from 'discord.js';
import {commands} from './commands';


process.on('unhandledRejection', (reason)=>{
    console.error(reason);
})

const client = new Client({
    intents: ['GUILDS', 'GUILD_VOICE_STATES'],
});


client.on('interactionCreate', async (interaction)=>{
    if(!interaction.inGuild() || !interaction.isCommand()){
        return
    }
    for (const command of commands) {
        if(command.commandName === interaction.commandName){
            await interaction.deferReply()
            await command.handler(interaction)
            break
        }
    }
})

async function main(){
    await client.login(process.env.BOT_TOKEN)
}

main().catch(console.error)