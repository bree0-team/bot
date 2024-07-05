import {TextChannel, VoiceChannel} from 'discord.js'
import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {allCheck} from '../helpers/allCheck.js'
import ClanChannelManager from '../managers/clan-channel.manager.js'
import {CLAN_CHANNEL_DELETE_SELECT} from './enums/CustomIds.enum.js'

class DeleteSelectedInteraction extends PublicHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<ChannelId>) {
        const {clan} = await allCheck(interaction)
        const channels = values.map(channelId => interaction.guild.channels
            .resolve(channelId) as (TextChannel | VoiceChannel))
            .map(channel => {
                ClanChannelManager.remove(channel.id)
                channel.delete()
                return channel.name
            })
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:delete', {
                channels: channels.map(i => '#' + i).join(', ')
            }))
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new DeleteSelectedInteraction(CLAN_CHANNEL_DELETE_SELECT)