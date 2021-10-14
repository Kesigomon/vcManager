import {CommandInteraction, Guild, GuildMember, VoiceChannel} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';

export const commandName = 'vcrandall'
export const command = new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('あなたがいるVCにいるメンバー全員をランダムで別なVC移動させます')

function shuffle<T>(array: Array<T>) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


export async function handler(interaction: CommandInteraction){
    if (!interaction.inGuild()){
        return;
    }
    const author = interaction.member
    const guild = interaction.guild
    if(!(author instanceof GuildMember && guild instanceof Guild)){
        return
    }
    if(!author.permissions.has(['MOVE_MEMBERS'])){
        await interaction.editReply({content: 'あなたに「メンバーを移動」の権限がありません'})
        return
    }
    const channel = author.voice.channel
    if(!channel){
        await interaction.editReply({content: 'VCに入っていません'})
        return
    }
    try{
        const members = shuffle([...channel.members.values()])
        const allChannel = [...guild.channels.cache.values()].filter(
            (c): c is VoiceChannel=> c instanceof VoiceChannel
        )
        let index = 0;
        for (const member of members) {
            await member.voice.setChannel(allChannel[index])
            index++;
            if(index >= allChannel.length){
                index = 0;
            }
        }
    }
    finally {
        await interaction.deleteReply()
    }
}
