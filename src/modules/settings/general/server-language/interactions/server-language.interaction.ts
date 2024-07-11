import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AppLocale} from '../../../../locale/helpers/consts.js'
import SettingsGeneralManager from '../../managers/settings-general.manager.js'
import {SERVER_LANGUAGE} from '../enums/CustomIds.enum.js'
import {ServerLanguage} from '../ServerLanguage.js'

class ServerLanguageInteraction extends PrivateHandler {
    protected async runValue({interaction, value}: SelectOneValueHandlerOptions<AppLocale>) {
        await SettingsGeneralManager.createOrUpdate(interaction.guildId, {server_language: value})
        return new ServerLanguage(interaction).run()
    }
}

export default new ServerLanguageInteraction(SERVER_LANGUAGE)