import {RepliableInteraction} from 'discord.js'
import SettingsClanAdManager from '../../../settings/clan/ad/managers/settings-clan-ad.manager.js'
import {ClanAdDisabledError} from '../errors/clan-ad.error.js'

export const enabledAd = async (interaction: RepliableInteraction): Promise<void|never> => {
    const {value} = await SettingsClanAdManager.getOne(interaction.guildId)
    if (!value) throw new ClanAdDisabledError(interaction)
}