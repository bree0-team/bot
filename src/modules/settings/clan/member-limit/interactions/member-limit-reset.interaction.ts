import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {MEMBER_LIMIT_RESET} from '../enums/CustomIds.enum.js'
import {MemberLimit} from '../MemberLimit.js'

class MemberLimitReset extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsClanManager.createOrUpdate(interaction.guildId, {member_limit: null})
        return new MemberLimit(interaction).run()
    }
}

export default new MemberLimitReset(MEMBER_LIMIT_RESET)