import {PrivateHandler} from '../../../../../handlers/interaction.js'
import {ButtonPageOptions} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {USERS} from '../enums/CustomIds.enum.js'
import {Users} from '../Users.js'

class UsersInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page} = data
        return new Users(interaction).run(itemId, after, page)
    }
}

export default new UsersInteraction(USERS)