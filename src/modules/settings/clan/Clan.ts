import {InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../services/interaction.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {BaseSettingsClan} from './structures/BaseSettingsClan.js'

export class Clan extends BaseSettingsClan {
    async run() {
        const embed = this.embed()
            .setDescription(this.t('settings:clan:description'))
        const components: InteractionReplyComponent[] = [this.select(), this.back(MAIN_SELECT)]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}