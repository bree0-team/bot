import {SelectBuilder} from '../../../../builders/select.js'
import {COMMAND_TYPE_SELECT, SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Usage} from './Usage.js'

export default new SelectBuilder(COMMAND_TYPE_SELECT, Usage, {
    //emoji: SelectEmoji.Command,
    label: 'settings:commands:options:usage',
    value: SettingsCommandsTypeSelectValuesCustomIds.Usage
})