import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {Activity} from '../Activity.js'
import {ACTIVITY_MEMBER_TYPES} from '../enums/CustomIds.enum.js'
import {MemberType} from '../enums/MemberType.enum.js'
import SettingsActivityManager from '../managers/settings-activity.manager.js'

class MemberTypesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<MemberType>) {
        await SettingsActivityManager.createOrUpdate(interaction.guildId, {memberTypes: values})
        return new Activity(interaction).run()
    }
}

export default new MemberTypesInteraction(ACTIVITY_MEMBER_TYPES)