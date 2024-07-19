import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Mun} from './Mun.js'

export default new SelectBuilder(MAIN_SELECT, Mun, {
    emoji: SelectEmoji.Input,
    label: 'settings:options:mun',
    value: MainSelectValuesCustomIds.Mun
})