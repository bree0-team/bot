import {bold, channelMention, TextChannel, VoiceChannel} from 'discord.js'
import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {allCheck} from '../helpers/allCheck.js'
import ClanChannelManager from '../managers/clan-channel.manager.js'
import {ChannelNameData} from '../types/data.type.js'
import {CLAN_CHANNEL_NAME_SELECT} from './enums/CustomIds.enum.js'

class NameSelectedInteraction extends PublicHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<ChannelId, ChannelNameData>
    ) {
        const {clan} = await allCheck(interaction)
        const {name} = data
        values.map(channelId => interaction.guild.channels
            .resolve(channelId) as (TextChannel | VoiceChannel))
            .map(channel => {
                ClanChannelManager.update(channel.id, {name})
                channel.edit({name})
            })
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription([
                interaction.t('clan:channel:name:set', {name}),
                '',
                bold(interaction.t('select:ed_channels')  + ': ') + values.map(i => channelMention(i))
                    .join(', ')
            ].join('\n'))
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new NameSelectedInteraction(CLAN_CHANNEL_NAME_SELECT)