import {PrivateHandler} from '../../../../../handlers/interaction.js'
import {SelectOneValuePageOptions} from '../../../../../handlers/paginator.js'
import SettingsGeneralManager from '../../managers/settings-general.manager.js'
import {TIMEZONE_SELECT} from '../enums/CustomIds.enum.js'
import {Timezone} from '../Timezone.js'

class TimezoneInteraction extends PrivateHandler {
    protected async runValue({interaction, value, data}: SelectOneValuePageOptions) {
        const {page} = data
        await SettingsGeneralManager.createOrUpdate(interaction.guildId, {timezone: value})
        return new Timezone(interaction).run(page)
    }
}

export default new TimezoneInteraction(TIMEZONE_SELECT)