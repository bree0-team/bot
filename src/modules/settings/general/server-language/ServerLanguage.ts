import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {InteractionReplyComponent, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {AppLocaleValues, LanguageChoice} from '../../../locale/helpers/consts.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsGeneralManager from '../managers/settings-general.manager.js'
import {BaseSettingsGeneral} from '../structures/BaseSettingsGeneral.js'
import {SERVER_LANGUAGE} from './enums/CustomIds.enum.js'

export class ServerLanguage extends BaseSettingsGeneral {
    async run() {
        const {server_language} = await SettingsGeneralManager.getOne(this.guildId)
        const language: LanguageChoice = AppLocaleValues.find(i => i.value === server_language)
        const embed = this.embed
            .setDescription(
                [
                    this.t('settings:general:server_language:description'),
                    '',
                    bold(this.t('settings:general:server_language:name') + ':') + ' '
                    + (language ? (language.emoji + ' ' + language.name) : this.t('not_set'))
                ].join('\n')
            )
        const select = new StringSelectMenuBuilder({
            customId: SERVER_LANGUAGE
        }).setOptions(
            AppLocaleValues.map(i => new StringSelectMenuOptionBuilder({
                emoji: i.emoji,
                label: i.name,
                value: i.value,
                default: i.value === language?.value
            }))
        )
        const components: InteractionReplyComponent[] = [
            this.select(SettingsGeneralSelectValuesCustomIds.ServerLanguage),
            StringSelectRowBuilder(select),
            this.back(MAIN_SELECT),
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}