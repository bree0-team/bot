import {SelectBuilder} from '../../../../builders/select.js'
import {QA_SELECT, QaSelectValues} from '../enums/CustomIds.enum.js'
import {Roles} from './Roles.js'

export default new SelectBuilder(QA_SELECT, Roles, {
    //emoji: SelectEmoji.Command,
    label: 'settings:qa:options:roles',
    value: QaSelectValues.Roles
})