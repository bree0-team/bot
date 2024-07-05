import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Roles} from './Roles.js'

export default new SelectBuilder(MAIN_SELECT, Roles, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:roles',
    value: MainSelectValuesCustomIds.Roles
})