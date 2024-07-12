import {VoiceChannel} from 'discord.js'
import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {allCheck} from '../helpers/allCheck.js'
import {ChannelMemberLimitData} from '../types/data.type.js'
import {CLAN_CHANNEL_ML_SELECT} from './enums/CustomIds.enum.js'

class MLSelectedInteraction extends PublicHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<ChannelId, ChannelMemberLimitData>
    ) {
        const {clan} = await allCheck(interaction)
        const {limit} = data
        values.map(channelId => interaction.guild.channels.resolve(channelId) as VoiceChannel)
            .filter(channel => channel)
            .map(channel => channel.edit({userLimit: limit}))
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:members_limit:set', {limit}))
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new MLSelectedInteraction(CLAN_CHANNEL_ML_SELECT)