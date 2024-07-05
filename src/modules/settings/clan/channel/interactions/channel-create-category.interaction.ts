import {ChannelType} from 'discord.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {GuildEmbed} from '../../../../../helpers/embed.js'
import {ConfirmButton} from '../../../../../services/interaction.js'
import {InteractionUtils} from '../../../../../utils/interaction.js'
import {
    CHANNEL_CREATE_CATEGORY_CONFIRM,
    CHANNEL_SEND_CANCEL,
    CHANNEL_SEND_CONFIRM
} from '../enums/CustomIds.enum.js'
import SettingsClanChannelManager from '../managers/settings-clan-channel.manager.js'

class ChannelCreateCategoryInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const category = await InteractionUtils.createChannel(interaction, {
            type: ChannelType.GuildCategory,
            name: interaction.t('settings:clan:channel:category:name')
        })
        await SettingsClanChannelManager.createOrUpdate(interaction.guildId, {categoryId: category.id})
        const embed = GuildEmbed(interaction.guildId)
            .setDescription(interaction.t('settings:clan:channel:category:created'))
        return ConfirmButton({
            interaction, embed,
            confirmId: CHANNEL_SEND_CONFIRM, cancelId: CHANNEL_SEND_CANCEL
        })
    }
}

export default new ChannelCreateCategoryInteraction(CHANNEL_CREATE_CATEGORY_CONFIRM)