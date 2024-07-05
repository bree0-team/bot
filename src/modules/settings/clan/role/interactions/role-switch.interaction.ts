import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import ClanMemberManager from '../../../../clan/managers/clan-member.manager.js'
import ClanManager from '../../../../clan/managers/clan.manager.js'
import {NamePatternUtils} from '../../../../clan/utils/name-pattern.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {ROLE_SWITCH} from '../enums/CustomIds.enum.js'
import {Role} from '../Role.js'

class RoleSwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const clanManager = await SettingsClanManager.getOne(interaction.guildId)
        await SettingsClanManager.createOrUpdate(interaction.guildId, {role: !clanManager.role})
        const clans = ClanManager.findAllByGuildId(interaction.guildId)
        if (clanManager.role) {
            clans.map(async clan => {
                const role = await interaction.guild.roles.create({
                    color: clan.color,
                    name: await NamePatternUtils.getPattern(clan),
                    permissions: 0n
                })
                ClanManager.update(clan.id, {roleId: role.id})
                const memberManager = ClanMemberManager.findAllByClanId(clan.id)
                memberManager.map(clanMember => interaction.guild.members.addRole({
                    user: clanMember.userId, role
                }))
            })
        } else {
            clans.map(clan => {
                interaction.guild.roles.delete(clan.roleId)
                ClanManager.update(clan.id, {roleId: null})
            })
        }
        return new Role(interaction).run()
    }
}

export default new RoleSwitchInteraction(ROLE_SWITCH)