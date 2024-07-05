import {SelectBuilder} from '../../../../builders/select.js'
import {XpSelectValues, XP_SELECT} from '../enums/CustomIds.enum.js'
import {GiveVoice} from './GiveVoice.js'

export default new SelectBuilder(XP_SELECT, GiveVoice, {
    label: 'settings:xp:options:voice_give',
    value: XpSelectValues.GiveVoice
})