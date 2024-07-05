import {SelectBuilder} from '../../../../builders/select.js'
import {QA_SELECT, QaSelectValues} from '../enums/CustomIds.enum.js'
import {Resp} from './Resp.js'

export default new SelectBuilder(QA_SELECT, Resp, {
    //emoji: SelectEmoji.Command,
    label: 'settings:qa:options:resp',
    value: QaSelectValues.Resp
})