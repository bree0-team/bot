import {InteractionReplyOptions} from 'discord.js'
import {CommandName} from '../../../../builders/slash.js'
import {SwitchEmoji} from '../../../../helpers/buttons.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsCommandsManager from '../managers/settings-commands.manager.js'
import {BaseSettingsCommands} from '../structures/BaseSettingsCommands.js'
import {CommandData} from '../types/data.type.js'
import {EPHEMERAL_SWITCH} from './enums/CustomIds.enum.js'

export class Ephemeral extends BaseSettingsCommands {
    async run(command: CommandName) {
        const {ephemeral} = await SettingsCommandsManager.getOne(this.guildId, command)
        const embed = this.embed()
            .setDescription([
                this.t('settings:commands:ephemeral'),
                '',
                SwitchEmoji(ephemeral) + ' ' + this.t('settings:commands:options:ephemeral'),
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.selectCommand(command),
            this.selectType(command, SettingsCommandsTypeSelectValuesCustomIds.Ephemeral),
            this.back(MAIN_SELECT, [
                this.turnOnOff(EPHEMERAL_SWITCH, ephemeral)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: CommandData = {command}
        return this.reply({replyData, data})
    }
}