import {SelectBuilder} from '../../../../builders/select.js'
import {QA_SELECT, QaSelectValues} from '../enums/CustomIds.enum.js'
import {Text} from './Text.js'

export default new SelectBuilder(QA_SELECT, Text, {
    //emoji: SelectEmoji.Command,
    label: 'settings:qa:options:text',
    value: QaSelectValues.Text
})