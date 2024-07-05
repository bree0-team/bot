import {bold, channelMention, ChannelSelectMenuBuilder, ChannelType, InteractionReplyOptions} from 'discord.js'
import {InteractionEmoji} from '../../../../enums/InteractionEmoji.enum.js'
import {SwitchEmoji} from '../../../../helpers/buttons.js'
import {channels, minutes} from '../../../../helpers/counts.js'
import {titleCase} from '../../../../helpers/title.js'
import {
    ActionChannelSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent
} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {defaultCooldown} from './constants/defaults.js'
import {
    AD_CHANNEL,
    AD_COOLDOWN_EDIT,
    AD_COOLDOWN_RESET,
    AD_SWITCH
} from './enums/CustomIds.enum.js'
import SettingsClanAdManager from './managers/settings-clan-ad.manager.js'

export class Ad extends BaseSettingsClan {
    settingsRow(channelId?: ChannelId): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: AD_CHANNEL,
            placeholder: this.t('select:channel'),
            channelTypes: [ChannelType.GuildText]
        })
        if (channelId) select.setDefaultChannels(channelId)
        return ChannelSelectRowBuilder(select)
    }
    async run() {
        const adManager = await SettingsClanAdManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:ad:description'),
                '',
                SwitchEmoji(adManager.value) + ' ' + bold(this.t('settings:clan:options:ad')),
                '',
                InteractionEmoji.MINUS + ' ' + bold(titleCase(channels(this.i, 1)) + ': ')
                + (adManager.channelId ? channelMention(adManager.channelId) : this.t('no')),
                InteractionEmoji.MINUS + ' ' + bold(this.t('cooldown') + ': ')
                + minutes(this.i, adManager.cooldown)
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.Ad),
            this.settingsRow(adManager.channelId),
            this.back(MAIN_SELECT, [
                this.turnOnOff(AD_SWITCH, adManager.value),
                ...this.editReset(AD_COOLDOWN_EDIT, AD_COOLDOWN_RESET,
                    adManager.cooldown === defaultCooldown)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}