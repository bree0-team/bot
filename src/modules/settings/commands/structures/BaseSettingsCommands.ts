import {EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {SelectService} from '../../../../builders/select.js'
import {CommandName} from '../../../../builders/slash.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {BaseSettings} from '../../structures/BaseSettings.js'
import {
    COMMAND_TYPE_SELECT,
    COMMANDS_SELECT,
    SettingsCommandsTypeSelectValuesCustomIds
} from '../enums/CustomIds.enum.js'

export class BaseSettingsCommands extends BaseSettings {
    embed = (): EmbedBuilder =>
        this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:commands'))
    selectCommand(name?: CommandName): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId: COMMANDS_SELECT})
            .setOptions(this.client.commands.map(command => new StringSelectMenuOptionBuilder({
                emoji: SelectEmoji.Command,
                label: command.data.name,
                value: command.data.name,
                default: command.data.name === name
            })))
        return StringSelectRowBuilder(select)
    }
    selectType(name?: CommandName, value?: SettingsCommandsTypeSelectValuesCustomIds): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: COMMAND_TYPE_SELECT,
            disabled: !name
        }).setOptions(...SelectService.getOptions(this.i, COMMAND_TYPE_SELECT, value))
        return StringSelectRowBuilder(select)
    }
}