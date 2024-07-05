import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {XpType} from '../../enums/XpType.enum.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {XP_TYPE} from '../enums/CustomIds.enum.js'
import {TextVoice} from '../TextVoice.js'

class XpTypesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<XpType>) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {xpTypes: values})
        return new TextVoice(interaction).run()
    }
}

export default new XpTypesInteraction(XP_TYPE)