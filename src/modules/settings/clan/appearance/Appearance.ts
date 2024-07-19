import {InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {SwitchEmoji} from '../../../../helpers/buttons.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {SETTINGS_CLAN_APPEARANCE, SettingsClanAppearanceSelectValuesCustomIds} from './enums/CustomIds.enum.js'
import SettingsClanAppearanceManager from './managers/settings-clan-appearance.manager.js'

export class Appearance extends BaseSettingsClan {
    #row(color: boolean, description: boolean, avatar: boolean, banner: boolean): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: SETTINGS_CLAN_APPEARANCE,
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: 4,
        }).setOptions(
            new StringSelectMenuOptionBuilder({
                emoji: SelectEmoji.EmbedColor,
                label: this.t('clan:appearance:options:color'),
                value: SettingsClanAppearanceSelectValuesCustomIds.Color,
                default: color,
            }),
            new StringSelectMenuOptionBuilder({
                emoji: SelectEmoji.Input,
                label: this.t('clan:appearance:options:description'),
                value: SettingsClanAppearanceSelectValuesCustomIds.Description,
                default: description,
            }),
            new StringSelectMenuOptionBuilder({
                emoji: SelectEmoji.Avatar,
                label: this.t('clan:appearance:options:avatar'),
                value: SettingsClanAppearanceSelectValuesCustomIds.Avatar,
                default: avatar,
            }),
            new StringSelectMenuOptionBuilder({
                emoji: SelectEmoji.Banner,
                label: this.t('clan:appearance:options:banner'),
                value: SettingsClanAppearanceSelectValuesCustomIds.Banner,
                default: banner,
            }),
        )
        return StringSelectRowBuilder(select)
    }
    async run() {
        const {
            color, description, avatar, banner
        } = await SettingsClanAppearanceManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:appearance'),
                '',
                SwitchEmoji(color) + ' ' + this.t('clan:appearance:options:color'),
                SwitchEmoji(description) + ' ' + this.t('clan:appearance:options:description'),
                SwitchEmoji(avatar) + ' ' + this.t('clan:appearance:options:avatar'),
                SwitchEmoji(banner) + ' ' + this.t('clan:appearance:options:banner'),
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.Appearance),
            this.#row(color, description, avatar, banner),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}