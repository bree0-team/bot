import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {MEMBER_LIMIT_MODAL, MEMBER_LIMIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {MemberLimit} from '../MemberLimit.js'

class MemberLimitEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const value = fields.getTextInputValue(MEMBER_LIMIT_MODAL_VALUE)
        await SettingsClanManager.createOrUpdate(interaction.guildId, {member_limit: _.toLength(value)})
        return new MemberLimit(interaction).run()
    }
}

export default new MemberLimitEditInteraction(MEMBER_LIMIT_MODAL)