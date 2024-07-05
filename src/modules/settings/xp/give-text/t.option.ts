import {SelectBuilder} from '../../../../builders/select.js'
import {XpSelectValues, XP_SELECT} from '../enums/CustomIds.enum.js'
import {GiveText} from './GiveText.js'

export default new SelectBuilder(XP_SELECT, GiveText, {
    label: 'settings:xp:options:text_give',
    value: XpSelectValues.GiveText
})