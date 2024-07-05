import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AfterData} from '../../../types/data.type.js'
import {USERS_AFTER} from '../enums/CustomIds.enum.js'
import {Users} from '../Users.js'

class UsersAfterInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AfterData>) {
        const {itemId} = data
        return new Users(interaction).run(itemId, value)
    }
}

export default new UsersAfterInteraction(USERS_AFTER)