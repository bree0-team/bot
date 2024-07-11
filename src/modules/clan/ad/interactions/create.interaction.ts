import {InteractionReplyOptions} from 'discord.js'
import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {GuildEmbed} from '../../../../helpers/embed.js'
import {iFollowUp} from '../../../../services/interaction.js'
import {Ad} from '../Ad.js'
import {CLAN_AD_CREATE_MODAL, CLAN_AD_CREATE_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {enabledAd} from '../helpers/enabledAd.js'
import {getOwner} from '../helpers/getOwner.js'
import ClanAdManager from '../managers/clan-ad.manager.js'

class CreateInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        getOwner(interaction)
        await enabledAd(interaction)
        const {clan} = getOwner(interaction)
        const title = fields.getTextInputValue(CLAN_AD_CREATE_MODAL_VALUE)
        await ClanAdManager.create(interaction.guildId, clan.id, {title})
        const embed = GuildEmbed(interaction.guildId)
            .setDescription(interaction.t('clan:ad:created', {ad: title}))
        const replyData: InteractionReplyOptions = {embeds: [embed], ephemeral: true}
        await iFollowUp({interaction, replyData})
        return new Ad(interaction).run()
    }
}

export default new CreateInteraction(CLAN_AD_CREATE_MODAL)