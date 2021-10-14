import {CommandInteraction, Guild, GuildMember, VoiceChannel} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';

export const commandName = 'vcgather'
export const command = new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('指定したVCに全メンバーを集合させます')
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('集合先のチャンネル')
            .setRequired(true)
    )

function Array2dto1d<T>(array: T[][]){
    return (<T[]>[]).concat(...array)
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
    const channel = interaction.options.getChannel('channel', true)
    if(channel.type !== 'GUILD_VOICE'){
        await interaction.editReply({content: '指定したチャンネルがVCではありません'})
        return
    }
    try{
        const allChannel = [...guild.channels.cache.values()].filter(
            (c): c is VoiceChannel=> c instanceof VoiceChannel
        )
        const members = Array2dto1d(allChannel.map((c) => [...c.members.values()]))
        for (const member of members) {
            await member.voice.setChannel(channel.id)
        }
    }
    finally {
        await interaction.deleteReply()
    }
}
