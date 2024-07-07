import {bold, ButtonBuilder, ButtonStyle, codeBlock, InteractionReplyOptions, unorderedList} from 'discord.js'
import {SwitchEmoji} from '../../../helpers/buttons.js'
import {InteractionReplyComponent} from '../../../services/interaction.js'
import {BannerImageManager} from '../../banner/managers/banner-image.manager.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {BANNER_SWITCH, GRID_SWITCH, ITEM_CREATE, ITEMS_SELECT, URL_EDIT} from './enums/CustomIds.enum.js'
import {description} from './helpers/description.js'
import SettingsBannerDataManager from './managers/settings-banner-data.manager.js'
import SettingsBannerManager from './managers/settings-banner.manager.js'
import {BaseSettingsBanner} from './structures/BaseSettingsBanner.js'

export class Banner extends BaseSettingsBanner {
    private get button(): ButtonBuilder {
        return new ButtonBuilder({
            customId: ITEM_CREATE,
            style: ButtonStyle.Success,
            label: this.t('create')
        })
    }
    private get gridButton(): ButtonBuilder {
        const imageManager = BannerImageManager.findOne(this.guildId)
        return new ButtonBuilder({
            customId: GRID_SWITCH,
            style: ButtonStyle[imageManager?.grid ? 'Danger' : 'Success'],
            label: this.t('settings:banner:grid:' + (imageManager?.grid ? 'off' : 'on'))
        })
    }
    async run() {
        const bannerManager = await SettingsBannerManager.getOne(this.guildId)
        const bannerDataManager = SettingsBannerDataManager.findAllByGuildId(this.guildId)
        const embed = this.embed
            .setDescription([
                SwitchEmoji(bannerManager.enabled) + ' ' + this.t('settings:options:banner'),
                '',
                bold(this.t('settings:banner:background') + ':'),
                codeBlock(bannerManager.url ?? this.t('no')),
                bold(this.t('settings:banner:elements') + ':'),
                unorderedList(bannerDataManager.map(i => {
                    let text = this.t('settings:banner:types:' + i.data.type)
                    const desc = description(this.i, i.data)
                    if (desc) text += ' (' + desc + ')'
                    return text
                }))
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.itemsRow(ITEMS_SELECT, bannerDataManager.map(i => i)),
            this.back(MAIN_SELECT, [
                this.turnOnOff(BANNER_SWITCH, bannerManager.enabled),
                this.gridButton,
                this.button,
                this.editButton(URL_EDIT)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components, files: [attachment]}
        return this.reply({replyData})
    }
}