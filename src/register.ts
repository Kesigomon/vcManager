import {REST} from '@discordjs/rest';
import {commands} from './commands';
import {APIApplication, Routes} from 'discord-api-types/v9'

async function main(){
    const token = process.env.BOT_TOKEN
    const guildId = process.env.GUILD_ID
    if(typeof token !== 'string'){
        console.log("Please specify token")
        return
    }
    const rest = new REST().setToken(token);
    const user = await rest.get(Routes.user('@me')) as APIApplication
    const route = guildId
        ? Routes.applicationGuildCommands(user.id, guildId)
        : Routes.applicationCommands(user.id)
    await rest.put(
        route,
        {body: commands.map((c) => c.command)}
    )
}
main().catch(console.error)