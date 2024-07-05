import {SelectBuilder} from '../../../../builders/select.js'
import {XpSelectValues, XP_SELECT} from '../enums/CustomIds.enum.js'
import {Formula} from './Formula.js'

export default new SelectBuilder(XP_SELECT, Formula, {
    label: 'settings:xp:options:formula',
    value: XpSelectValues.Formula
})