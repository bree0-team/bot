import {userMention} from 'discord.js'
import {EmotesImages} from '../../../../enums/EmotesImages.enum.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {EmbedField, GuildEmbed} from '../../../../helpers/embed.js'
import {ClanRank} from '../../enums/ClanRank.enum.js'
import {ClanMemberExistError, ClanYouExistError} from '../../errors/clan.error.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import ClanManager from '../../managers/clan.manager.js'
import ClanRoleManager from '../../role/managers/clan-role.manager.js'
import {CreateData} from '../../types/data.type.js'
import {CLAN_CREATE_CONFIRM} from '../enums/CustomIds.enum.js'

class CreateInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<CreateData>) {
        const {emoji, name, ownerId} = data
        const userId = ownerId || interaction.user.id

        if (ClanMemberManager.findOneByGuildId(interaction.guildId, userId))
            throw (
                interaction.user.id === userId ?
                    new ClanYouExistError(interaction) :
                    new ClanMemberExistError(interaction, userMention(userId))
            )

        const fields: EmbedField[] = [
            EmbedField(interaction.t('emoji'), emoji, true),
            EmbedField(interaction.t('name'), name, true),
        ]
        if (userId !== interaction.user.id) fields.push(
            EmbedField(interaction.t('clan:OWNER'), userMention(userId))
        )
        const embed = GuildEmbed(interaction.guildId)
            .setTitle(interaction.t('clan:created'))
            .addFields(fields)
            .setThumbnail(EmotesImages.SWORDSMAN)

        await interaction.editReply({embeds: [embed], components: []})

        const clanManager = await ClanManager.create(interaction.guildId, {emoji, name})
        const roleManager = await ClanRoleManager.create(interaction.guildId, clanManager.id, {
            name: interaction.t('clan:MEMBER'), isDefault: true
        })
        return ClanMemberManager.create(interaction.guildId, clanManager.id, {
            userId, rank: ClanRank.OWNER, clanRoleId: roleManager.id
        })
    }
}

export default new CreateInteraction(CLAN_CREATE_CONFIRM)