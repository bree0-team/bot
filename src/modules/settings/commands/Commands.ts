import {InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../services/interaction.js'
import {CommandName} from '../../../builders/slash.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {BaseSettingsCommands} from './structures/BaseSettingsCommands.js'
import {CommandData} from './types/data.type.js'

export class Commands extends BaseSettingsCommands {
    async run(command?: CommandName) {
        const embed = this.embed()
            .setDescription(this.t('settings:commands:description'))
        const components: InteractionReplyComponent[] = [
            this.selectCommand(command),
            this.selectType(command),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: CommandData = {command}
        return this.reply({replyData, data})
    }
}