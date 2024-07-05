import {SelectBuilder} from '../../../../builders/select.js'
import {XP_SELECT, XpSelectValues} from '../enums/CustomIds.enum.js'
import {Ignored} from './Ignored.js'

export default new SelectBuilder(XP_SELECT, Ignored, {
    label: 'settings:xp:options:ignored',
    value: XpSelectValues.Ignored
})