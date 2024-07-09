import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Commands} from './Commands.js'

export default new SelectBuilder(MAIN_SELECT, Commands, {
    emoji: SelectEmoji.Command,
    label: 'settings:options:commands',
    value: MainSelectValuesCustomIds.Commands
})