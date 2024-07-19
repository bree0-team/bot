import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {General} from './General.js'

export default new SelectBuilder(MAIN_SELECT, General, {
    emoji: SelectEmoji.General,
    label: 'settings:options:base',
    value: MainSelectValuesCustomIds.General
})