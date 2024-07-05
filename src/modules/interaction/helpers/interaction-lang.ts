import {Interaction} from 'discord.js'
import {defaultLocale} from '../../../helpers/defaults.js'
import {LocaleArgs} from '../../../services/i18n.js'
import LocaleManager from '../../locale/managers/locale.manager.js'
import SettingsGeneralManager from '../../settings/general/managers/settings-general.manager.js'

export function setTranslate(interaction: Interaction): void {
    const {lang} = interaction.client
    const generalManager = SettingsGeneralManager.findOne(interaction?.guildId)
    interaction.t = (key: string, args?: LocaleArgs) => lang.t(LocaleManager.getLocale(interaction.user.id) ||
        generalManager?.server_language || defaultLocale, key, args)
}