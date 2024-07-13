import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Roles} from './Roles.js'

export default new SelectBuilder(MAIN_SELECT, Roles, {
    emoji: SelectEmoji.Manage,
    label: 'settings:options:roles',
    value: MainSelectValuesCustomIds.Roles
})