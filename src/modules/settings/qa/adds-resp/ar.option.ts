import {SelectBuilder} from '../../../../builders/select.js'
import {QA_SELECT, QaSelectValues} from '../enums/CustomIds.enum.js'
import {AddsResp} from './AddsResp.js'

export default new SelectBuilder(QA_SELECT, AddsResp, {
    //emoji: SelectEmoji.Command,
    label: 'settings:qa:options:adds_resp',
    value: QaSelectValues.AddsResp
})