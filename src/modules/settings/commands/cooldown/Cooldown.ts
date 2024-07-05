import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import _ from 'lodash'
import {CommandName} from '../../../../builders/slash.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {RadioEmoji} from '../../../../helpers/buttons.js'
import {duration} from '../../../../helpers/counts.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {defaultCooldown} from '../constants/defaults.js'
import {CooldownType} from '../enums/CooldownType.enum.js'
import {SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsCommandsManager from '../managers/settings-commands.manager.js'
import {BaseSettingsCommands} from '../structures/BaseSettingsCommands.js'
import {CommandData} from '../types/data.type.js'
import {COOLDOWN_EDIT, COOLDOWN_RESET, COOLDOWN_TYPE_SELECT} from './enums/CustomIds.enum.js'

export class Cooldown extends BaseSettingsCommands {
    select(value?: CooldownType): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: COOLDOWN_TYPE_SELECT,
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN
        }).setOptions(_.map(CooldownType, i => new StringSelectMenuOptionBuilder({
            label: this.t('settings:commands:cooldown:type:' + i),
            value: i,
            default: i === value
        })))
        return StringSelectRowBuilder(select)
    }
    async run(command: CommandName) {
        const commandManager = await SettingsCommandsManager.getOne(this.guildId, command)
        const embed = this.embed()
            .setDescription([
                this.t('settings:commands:cooldown:description'),
                '',
                RadioEmoji(!commandManager.cooldownType) + ' '
                + this.t('settings:commands:cooldown:type:undefined'),
                RadioEmoji(commandManager.cooldownType === CooldownType.SERVER) + ' '
                + this.t('settings:commands:cooldown:type:SERVER'),
                RadioEmoji(commandManager.cooldownType === CooldownType.USER) + ' '
                + this.t('settings:commands:cooldown:type:USER'),
                '',
                bold(this.t('cooldown') + ': ') + duration(this.i, commandManager.cooldown),
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.selectCommand(command),
            this.selectType(command, SettingsCommandsTypeSelectValuesCustomIds.Cooldown),
            this.select(commandManager.cooldownType),
            this.back(MAIN_SELECT,
                this.editReset(COOLDOWN_EDIT, COOLDOWN_RESET, commandManager.cooldown === defaultCooldown)
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: CommandData = {command}
        return this.reply({replyData, data})
    }
}