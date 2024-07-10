import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {CreateData} from '../../types/data.type.js'
import {Create} from '../Create.js'
import {CLAN_CREATE_SELECT_USER} from '../enums/CustomIds.enum.js'

class CreateUserInteraction extends PrivateHandler {
    protected async runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, CreateData>) {
        const {emoji, name} = data
        return new Create(interaction).members(emoji, name, value)
    }
}

export default new CreateUserInteraction(CLAN_CREATE_SELECT_USER)