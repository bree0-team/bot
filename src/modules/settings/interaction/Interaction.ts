import {codeBlock, InteractionReplyOptions} from 'discord.js'
import {duration} from '../../../helpers/counts.js'
import {InteractionReplyComponent} from '../../../services/interaction.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {defaultValue} from './constants/defaults.js'
import {INTERACTION_EDIT, INTERACTION_RESET} from './enums/CustomIds.enum.js'
import SettingsInteractionManager from './managers/settings-interaction.manager.js'
import {BaseSettingsInteraction} from './structures/BaseSettingsInteraction.js'

export class Interaction extends BaseSettingsInteraction {
    async run() {
        const {value} = await SettingsInteractionManager.getOne(this.guildId)
        const embed = this.embed
            .setDescription(codeBlock(duration(this.i, value)))
        const components: InteractionReplyComponent[] = [
            this.back(MAIN_SELECT, this.editReset(INTERACTION_EDIT, INTERACTION_RESET,value === defaultValue))
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}