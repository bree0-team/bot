import {SelectBuilder} from '../../../../builders/select.js'
import {COMMAND_TYPE_SELECT, SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Reply} from './Reply.js'

export default new SelectBuilder(COMMAND_TYPE_SELECT, Reply, {
    //emoji: SelectEmoji.Command,
    label: 'settings:commands:options:reply',
    value: SettingsCommandsTypeSelectValuesCustomIds.Reply
})