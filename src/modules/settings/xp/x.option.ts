import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Xp} from './Xp.js'

export default new SelectBuilder(MAIN_SELECT, Xp, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:xp',
    value: MainSelectValuesCustomIds.Xp
})