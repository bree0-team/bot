import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {COMMAND_TYPE_SELECT, SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Ephemeral} from './Ephemeral.js'

export default new SelectBuilder(COMMAND_TYPE_SELECT, Ephemeral, {
    emoji: SelectEmoji.Ephemeral,
    label: 'settings:commands:options:ephemeral',
    value: SettingsCommandsTypeSelectValuesCustomIds.Ephemeral
})