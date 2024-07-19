import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Qa} from './Qa.js'

export default new SelectBuilder(MAIN_SELECT, Qa, {
    emoji: SelectEmoji.Qa,
    label: 'settings:options:qa',
    value: MainSelectValuesCustomIds.Qa
})