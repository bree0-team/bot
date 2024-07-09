import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Afk} from './Afk.js'

export default new SelectBuilder(MAIN_SELECT, Afk, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:afk',
    value: MainSelectValuesCustomIds.Afk
})