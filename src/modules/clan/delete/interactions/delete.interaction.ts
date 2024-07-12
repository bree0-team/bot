import {userMention} from 'discord.js'
import {EmotesImages} from '../../../../enums/EmotesImages.enum.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {EmbedField} from '../../../../helpers/embed.js'
import ClanChannelManager from '../../channel/managers/clan-channel.manager.js'
import {ClanMemberNotExistError, ClanYouNotExistError} from '../../errors/clan.error.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import ClanManager from '../../managers/clan.manager.js'
import {DeleteData} from '../../types/data.type.js'
import {DELETE_CONFIRM} from '../enums/CustomIds.enum.js'

class DeleteInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<DeleteData>) {
        const {clanId, ownerId} = data
        if (!ClanMemberManager.findOneByGuildId(interaction.guildId, ownerId))
            throw (
                interaction.user.id === ownerId ?
                    new ClanYouNotExistError(interaction) :
                    new ClanMemberNotExistError(interaction, userMention(ownerId))
            )
        const clanManager = ClanManager.findOne(clanId)
        const embed = (await clanTitleEmbed(clanManager, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:delete:confirmed'))
            .setThumbnail(EmotesImages.SWORDSMAN)
        if (ownerId !== interaction.user.id) embed.addFields(
            EmbedField(interaction.t('clan:OWNER'), userMention(ownerId))
        )
        await interaction.editReply({embeds: [embed], components: []})
        if (clanManager.roleId) {
            const role = interaction.guild.roles.resolve(clanManager.roleId)
            if (role) role.delete()
        }
        ClanChannelManager.findAllByClanId(clanId)
            .map(i => interaction.guild.channels.resolve(i.channelId))
            .filter(i => i)
            .map(i => i.delete())
        return ClanManager.remove(clanManager.id)
    }
}

export default new DeleteInteraction(DELETE_CONFIRM)