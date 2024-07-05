import {InteractionReplyOptions} from 'discord.js/typings'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import {BaseSettingsBanner} from '../structures/BaseSettingsBanner.js'
import {BannerType} from '../types/banner.type.js'
import {TYPES_SELECT} from './enums/CustomIds.enum.js'

export class Create extends BaseSettingsBanner {
    async run() {
        const components: InteractionReplyComponent[] = [
            this.itemsRow(TYPES_SELECT, Object.values(BannerType)),
            this.back(ITEMS_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [], components, files: []}
        return this.reply({replyData})
    }
}