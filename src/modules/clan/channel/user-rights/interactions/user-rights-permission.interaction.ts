import {channelMention, OverwriteType, PermissionFlagsBits, TextChannel, VoiceChannel} from 'discord.js'
import {users, channels as ch} from '../../../../../helpers/counts.js'
import {GuildEmbed, EmbedField} from '../../../../../helpers/embed.js'
import {InteractionHandler, PublicHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {titleCase} from '../../../../../helpers/title.js'
import {clanTitleEmbed} from '../../../helpers/embed.js'
import {allCheck} from '../../helpers/allCheck.js'
import {ChannelUserRightsData} from '../../types/data.type.js'
import {RightsUtils} from '../../utils/rights.js'
import {CLAN_CHANNEL_UR_PERMISSION_SELECT} from '../enums/CustomIds.enum.js'
import {UserPermissions} from '../enums/UserPermissions.enum.js'
import {UserRight} from '../enums/UserRight.enum.js'

class UserRightsPermissionInteraction extends PublicHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<UserPermissions, ChannelUserRightsData>
    ) {
        const {clan} = await allCheck(interaction)
        const {channels, right} = data
        const bigValue = values.map(i => PermissionFlagsBits[i])
            .reduce((prev, current) => prev | current, BigInt(0))
        channels.map(channelId => interaction.guild.channels.resolve(channelId) as (TextChannel | VoiceChannel))
            .map(channel => RightsUtils.updateUserRights(channel, right, bigValue,
                right === UserRight.everyone ? OverwriteType.Role : OverwriteType.Member))
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:user_rights:updated', {
                right: interaction.t('clan:channel:user_rights:options:' + right)
            }))
            .addFields(
                EmbedField(interaction.t('rights'), values.join('\n'), true),
                EmbedField(titleCase(ch(interaction, channels.length)), channels.map(i =>
                    channelMention(i)).join('\n'), true)
            )
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new UserRightsPermissionInteraction(CLAN_CHANNEL_UR_PERMISSION_SELECT)