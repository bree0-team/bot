import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Mun} from './Mun.js'

export default new SelectBuilder(MAIN_SELECT, Mun, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:mun',
    value: MainSelectValuesCustomIds.Mun
})