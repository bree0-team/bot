import {SelectBuilder} from '../../../../builders/select.js'
import {COMMAND_TYPE_SELECT, SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Cooldown} from './Cooldown.js'

export default new SelectBuilder(COMMAND_TYPE_SELECT, Cooldown, {
    //emoji: SelectEmoji.Command,
    label: 'cooldown',
    value: SettingsCommandsTypeSelectValuesCustomIds.Cooldown
})