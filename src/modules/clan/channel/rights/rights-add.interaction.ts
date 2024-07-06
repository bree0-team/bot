import {channelMention, TextChannel, userMention, VoiceChannel} from 'discord.js'
import _ from 'lodash'
import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {channels as ch, users} from '../../../../helpers/counts.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {titleCase} from '../../../../helpers/title.js'
import {UserId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {allCheck} from '../helpers/allCheck.js'
import {ChannelRightsData} from '../types/data.type.js'
import {UserRight} from '../user-rights/enums/UserRight.enum.js'
import {RightsUtils} from '../utils/rights.js'
import {CLAN_CHANNEL_RIGHTS_ADD_SELECT} from './enums/CustomIds.enum.js'

class RightsAddInteraction extends PublicHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<UserId, ChannelRightsData>
    ) {
        const {clan} = await allCheck(interaction)
        const {channels} = data
        const memberManager = ClanMemberManager.findAllByClanId(clan.id)
            .map(clanMember => clanMember.userId)
        const finalUsers = _.difference(values, memberManager) as UserId[]
        channels.map(channelId => interaction.guild.channels
            .resolve(channelId) as (TextChannel | VoiceChannel))
            .map(channel => RightsUtils.addUsers(channel, finalUsers, UserRight.clanGuest))
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:rights:add'))
            .setFields(
                EmbedField(
                    titleCase(interaction.t('counts:users', {count: finalUsers.length})),
                    finalUsers.map(i => userMention(i)).join('\n'), true
                ),
                EmbedField(
                    titleCase(interaction.t('counts:channels', {count: channels.length})),
                    channels.map(i => channelMention(i)).join('\n'), true
                )
            )
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new RightsAddInteraction(CLAN_CHANNEL_RIGHTS_ADD_SELECT)