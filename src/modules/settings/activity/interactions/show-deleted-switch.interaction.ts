import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {Activity} from '../Activity.js'
import {ACTIVITY_SHOW_DELETED_SWITCH} from '../enums/CustomIds.enum.js'
import SettingsActivityManager from '../managers/settings-activity.manager.js'

class ShowDeletedSwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const activityManager = await SettingsActivityManager.getOne(interaction.guildId)
        await SettingsActivityManager.createOrUpdate(interaction.guildId, {
            showDeleted: !activityManager.showDeleted
        })
        return new Activity(interaction).run()
    }
}

export default new ShowDeletedSwitchInteraction(ACTIVITY_SHOW_DELETED_SWITCH)