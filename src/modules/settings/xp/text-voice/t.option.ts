import {SelectBuilder} from '../../../../builders/select.js'
import {XpSelectValues, XP_SELECT} from '../enums/CustomIds.enum.js'
import {TextVoice} from './TextVoice.js'

export default new SelectBuilder(XP_SELECT, TextVoice, {
    label: 'settings:xp:options:text_voice',
    value: XpSelectValues.TextVoice
})