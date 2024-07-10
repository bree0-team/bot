import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {Create} from '../Create.js'
import {MANAGE_SELECT} from '../enums/CustomIds.enum.js'
import {WhoManage} from '../enums/WhoManage.enum.js'
import SettingsClanManageManager from '../managers/settings-clan-manage.manager.js'

class TypeInteraction extends PrivateHandler {
    protected async runValue({interaction, value}: SelectOneValueHandlerOptions<WhoManage>) {
        await SettingsClanManageManager.createOrUpdate(interaction.guildId, {who: value})
        return new Create(interaction).run()
    }
}

export default new TypeInteraction(MANAGE_SELECT)