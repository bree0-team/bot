import {userMention} from 'discord.js'
import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {users} from '../../../../helpers/counts.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {titleCase} from '../../../../helpers/title.js'
import {UserId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {allCheck} from '../helpers/allCheck.js'
import {CLAN_CHANNEL_KU_SELECT} from './enums/CustomIds.enum.js'

class KickUserSelectedInteraction extends PublicHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<UserId>) {
        const {clan} = await allCheck(interaction)
        values.map(memberId => interaction.guild.members.resolve(memberId))
            .map(member => member.voice.disconnect())
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:kick_user:confirmed'))
            .setFields(
                EmbedField(titleCase(users(interaction, 1)), values.map(i => userMention(i)).join('\n'))
            )
        return interaction.editReply({embeds: [embed], components: []})
    }
}

export default new KickUserSelectedInteraction(CLAN_CHANNEL_KU_SELECT)