import {InteractionReplyOptions} from 'discord.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {ClanAccessCommands} from '../../enums/ClanCommands.enum.js'
import {ClanRoleNotExistError} from '../../errors/clan.error.js'
import {rankAccess} from '../../helpers/rankAccess.js'
import ClanManager from '../../managers/clan.manager.js'
import {BaseClan} from '../../structures/BaseClan.js'
import ClanRoleManager from '../managers/clan-role.manager.js'

export class Rename extends BaseClan {
    async run() {
        const role = this.getString('role')
        const name = this.getString('name')
        const owner = await rankAccess(this.i, ClanAccessCommands.ROLE_RENAME)

        const clanRole = ClanRoleManager.findOne(Number(role))
        if (!clanRole || clanRole.clanId !== owner.clanId) throw new ClanRoleNotExistError(this.i)

        const clanManager = ClanManager.findOne(owner.clanId)
        const embed = (await this.clanTitleEmbed(clanManager))
            .setDescription(this.t('clan:role:rename', {user: this.user}))
            .addFields(
                EmbedField(this.t('before'), clanRole.name, true),
                EmbedField(this.t('after'), name, true),
            )
        const replyData: InteractionReplyOptions = {embeds: [embed]}
        await this.reply({replyData})
        return ClanRoleManager.update(Number(role), {name})
    }
}