import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {GENERAL_SELECT, SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {ServerLanguage} from './ServerLanguage.js'

export default new SelectBuilder(GENERAL_SELECT, ServerLanguage, {
    emoji: SelectEmoji.ServerLanguage,
    label: 'settings:general:options:default_server_language',
    value: SettingsGeneralSelectValuesCustomIds.ServerLanguage
})