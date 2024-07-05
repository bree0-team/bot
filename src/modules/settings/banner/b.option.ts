import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Banner} from './Banner.js'

export default new SelectBuilder(MAIN_SELECT, Banner, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:banner',
    value: MainSelectValuesCustomIds.Banner
})