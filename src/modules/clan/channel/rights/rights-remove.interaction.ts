import {channelMention, TextChannel, userMention, VoiceChannel} from 'discord.js'
import {users, channels as ch} from '../../../../helpers/counts.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {InteractionHandler, PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {titleCase} from '../../../../helpers/title.js'
import {UserId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {allCheck} from '../helpers/allCheck.js'
import {ChannelRightsData} from '../types/data.type.js'
import {RightsUtils} from '../utils/rights.js'
import {CLAN_CHANNEL_RIGHTS_REMOVE_SELECT} from './enums/CustomIds.enum.js'

class RightsRemoveInteraction extends PublicHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<UserId, ChannelRightsData>
    ) {
        const {clan} = await allCheck(interaction)
        const {channels} = data
        channels.map(channelId => interaction.guild.channels
            .resolve(channelId) as (TextChannel | VoiceChannel))
            .map(channel => RightsUtils.removeUsers(channel, values))
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:rights:remove'))
            .setFields(
                EmbedField(titleCase(users(interaction, values.length)), values
                    .map(i => userMention(i)).join('\n'), true),
                EmbedField(titleCase(ch(interaction, channels.length)), channels
                    .map(i => channelMention(i)).join('\n'), true)
            )
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new RightsRemoveInteraction(CLAN_CHANNEL_RIGHTS_REMOVE_SELECT)