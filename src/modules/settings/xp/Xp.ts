import {InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../services/interaction.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {BaseSettingsXp} from './structures/BaseSettingsXp.js'

export class Xp extends BaseSettingsXp {
    async run() {
        const embed = this.embed()
            .setDescription(this.t('settings:xp:description'))
        const components: InteractionReplyComponent[] = [
            this.select(),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}