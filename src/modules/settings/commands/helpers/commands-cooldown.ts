import {time} from 'discord.js'
import {CommandName} from '../../../../builders/slash.js'
import {GuildId, UserId} from '../../../../types/base.type.js'
import {CooldownType} from '../enums/CooldownType.enum.js'
import CommandsCooldownManager from '../managers/commands-cooldown.manager.js'
import SettingsCommandsManager from '../managers/settings-commands.manager.js'

async function createCooldown(guildId: GuildId, userId: UserId, command: CommandName): Promise<boolean> {
    await CommandsCooldownManager.createOrUpdate(guildId, userId, command)
    return false
}

export async function commandsCooldown(command: CommandName, guildId: GuildId, userId: UserId): Promise<boolean | string> {
    const {cooldown, cooldownType} = await SettingsCommandsManager.getOne(guildId, command)
    if (!cooldownType) return createCooldown(guildId, userId, command)
    const down = CommandsCooldownManager
        .findOne(guildId, cooldownType === CooldownType.USER ? userId : undefined)
    if (!down) return createCooldown(guildId, userId, command)
    const getTime = down.updatedAt.getTime() + (cooldown * 1000)
    if (getTime > new Date().getTime()) return time(Math.floor(getTime / 1000), 'R')
    return createCooldown(guildId, userId, command)
}