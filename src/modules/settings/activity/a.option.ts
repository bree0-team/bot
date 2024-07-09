import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Activity} from './Activity.js'

export default new SelectBuilder(MAIN_SELECT, Activity, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:activity',
    value: MainSelectValuesCustomIds.Activity
})