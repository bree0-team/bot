import {
    bold,
    channelMention,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from 'discord.js'
import _ from 'lodash'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder,
} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {BaseClan} from '../../structures/BaseClan.js'
import {allCheck} from '../helpers/allCheck.js'
import {ChannelUserRightsData} from '../types/data.type.js'
import {CLAN_CHANNEL_UR_PERMISSION_SELECT, CLAN_CHANNEL_UR_RIGHT_SELECT} from './enums/CustomIds.enum.js'
import {UserPermissions} from './enums/UserPermissions.enum.js'
import {UserRight} from './enums/UserRight.enum.js'

export class UserRights extends BaseClan {
    rightRow(value?: UserRight): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder()
            .setCustomId(CLAN_CHANNEL_UR_RIGHT_SELECT)
            .setOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(this.t('clan:channel:user_rights:options:clanMember'))
                    .setValue(UserRight.clanMember)
                    .setDefault(UserRight.clanMember === value),
                new StringSelectMenuOptionBuilder()
                    .setLabel(this.t('clan:channel:user_rights:options:clanGuest'))
                    .setValue(UserRight.clanGuest)
                    .setDefault(UserRight.clanGuest === value),
                new StringSelectMenuOptionBuilder()
                    .setLabel(this.t('clan:channel:user_rights:options:everyone'))
                    .setValue(UserRight.everyone)
                    .setDefault(UserRight.everyone === value),
            )
        return StringSelectRowBuilder(select)
    }
    permissionRow(right?: UserRight): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CLAN_CHANNEL_UR_PERMISSION_SELECT,
            placeholder: this.t('select:rights'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: _.size(UserPermissions) as number,
            disabled: !right
        }).setOptions(_.map(UserPermissions, i => new StringSelectMenuOptionBuilder({label: i, value: i})))
        return StringSelectRowBuilder(select)
    }
    async run(channels: ChannelId[], right?: UserRight) {
        const {clan} = await allCheck(this.i)
        const embed = (await this.clanTitleEmbed(clan))
            .setDescription([
                this.t('clan:channel:user_rights:description', {
                    right: this.t('clan:channel:user_rights:options:everyone')
                }),
                '',
                bold(this.t('select:ed_channels') + ': ') + channels.map(i => channelMention(i))
                    .join(', ')
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.rightRow(right),
            this.permissionRow(right)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: ChannelUserRightsData = {channels, right}
        return this.reply({replyData, data})
    }
}