import {InteractionReplyOptions} from 'discord.js'
import {CommandName} from '../../../../builders/slash.js'
import {SwitchEmoji} from '../../../../helpers/buttons.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsCommandsManager from '../managers/settings-commands.manager.js'
import {BaseSettingsCommands} from '../structures/BaseSettingsCommands.js'
import {CommandData} from '../types/data.type.js'
import {REPLY_SWITCH} from './enums/CustomIds.enum.js'

export class Reply extends BaseSettingsCommands {
    async run(command: CommandName) {
        const {reply} = await SettingsCommandsManager.getOne(this.guildId, command)
        const embed = this.embed()
            .setDescription([
                this.t('settings:commands:reply'),
                '',
                SwitchEmoji(reply) + ' ' + this.t('settings:commands:options:reply'),
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.selectCommand(command),
            this.selectType(command, SettingsCommandsTypeSelectValuesCustomIds.Reply),
            this.back(MAIN_SELECT, [
                this.turnOnOff(REPLY_SWITCH, reply)
                    .setDisabled(command === 'settings')
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: CommandData = {command}
        return this.reply({replyData, data})
    }
}