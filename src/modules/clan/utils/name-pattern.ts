import SettingsClanManager from '../../settings/clan/managers/settings-clan.manager.js'
import {ClanModel} from '../models/clan.model.js'

export class NamePatternUtils {
    static async getPattern(clan: ClanModel): Promise<string> {
        const {name_pattern} = await SettingsClanManager.getOne(clan.guildId)
        return NamePatternUtils.get(name_pattern, clan.emoji, clan.name)
    }
    static get = (pattern: string, emoji: string, name: string): string => pattern
        .replaceAll('{emoji}', emoji)
        .replaceAll('{name}', name)
}