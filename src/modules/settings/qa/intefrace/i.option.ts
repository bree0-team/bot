import {SelectBuilder} from '../../../../builders/select.js'
import {QA_SELECT, QaSelectValues} from '../enums/CustomIds.enum.js'
import {Interface} from './Interface.js'

export default new SelectBuilder(QA_SELECT, Interface, {
    //emoji: SelectEmoji.Command,
    label: 'settings:qa:options:interface',
    value: QaSelectValues.Interface
})