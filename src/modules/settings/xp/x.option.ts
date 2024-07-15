import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Xp} from './Xp.js'

export default new SelectBuilder(MAIN_SELECT, Xp, {
    emoji: SelectEmoji.Cup,
    label: 'settings:options:xp',
    value: MainSelectValuesCustomIds.Xp
})