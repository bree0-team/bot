import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {Create} from '../Create.js'
import {CREATE_SELECT} from '../enums/CustomIds.enum.js'
import {WhoCreate} from '../enums/WhoCreate.enum.js'
import SettingsClanCreateManager from '../managers/settings-clan-create.manager.js'

class TypeInteraction extends PrivateHandler {
    protected async runValue({interaction, value}: SelectOneValueHandlerOptions<WhoCreate>) {
        await SettingsClanCreateManager.createOrUpdate(interaction.guildId, {who: value})
        return new Create(interaction).run()
    }
}

export default new TypeInteraction(CREATE_SELECT)