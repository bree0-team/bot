import {EmbedBuilder, EmbedData} from 'discord.js'
import {EmbedColors} from '../enums/EmbedColors.enum.js'
import SettingsGeneralManager from '../modules/settings/general/managers/settings-general.manager.js'
import {GuildId} from '../types/base.type.js'

type GuildEmbedData = Omit<EmbedData, 'color'>

export function GuildEmbed(guildId: GuildId, data?: GuildEmbedData): EmbedBuilder {
    const generalManager = SettingsGeneralManager.findOne(guildId)
    return new EmbedBuilder(data)
        .setColor(generalManager?.embed_color || EmbedColors.EMPTY)
}

export interface EmbedField {
    name: string
    value: string
    inline?: boolean
}

export function EmbedField(name: string, value: string, inline?: boolean): EmbedField {
    const data: EmbedField = {name, value}
    if (inline !== undefined) Object.assign(data, {inline})
    return data
}