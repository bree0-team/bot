import {TextChannel} from 'discord.js'
import {UnknownChannelError} from '../../../../../errors/notfound.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsClanAdManager from '../../../../settings/clan/ad/managers/settings-clan-ad.manager.js'
import {CLAN_AD_SEND} from '../../enums/CustomIds.enum.js'
import {ClanAdChannelNotSetError, ClanAdCooldownError} from '../../errors/clan-ad.error.js'
import {adCooldown} from '../../helpers/ad-cooldown.js'
import {enabledAd} from '../../helpers/enabledAd.js'
import {getOwner} from '../../helpers/getOwner.js'
import {makeEmbed} from '../../helpers/makeEmbed.js'
import ClanAdManager from '../../managers/clan-ad-manager.js'
import {AdEditData} from '../../types/data.type.js'

class SendInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clan} = getOwner(interaction)
        await enabledAd(interaction)
        const {clanAdId} = data
        const {
            author, authorUrl, authorIcon,
            color, bodyTitle: title, bodyDescription: description, bodyUrl: url,
            fields,
            imageUrl, thumbnailUrl,
            footerText, footerIcon
        } = ClanAdManager.findOne(clanAdId)
        const embed = makeEmbed({
            author: {name: author, url: authorUrl, iconURL: authorIcon},
            title, description, url, color,
            fields, image: {url: imageUrl}, thumbnail: {url: thumbnailUrl},
            footer: {text: footerText, iconURL: footerIcon}
        })
        const adManager = await SettingsClanAdManager.getOne(interaction.guildId)
        if (!adManager.channelId) throw new ClanAdChannelNotSetError(interaction)
        const cooldown = await adCooldown(interaction.guildId, clan.id)
        if (cooldown) throw new ClanAdCooldownError(interaction, cooldown as string)
        const channel = interaction.guild.channels.resolve(adManager.channelId) as TextChannel
        if (!channel) throw new UnknownChannelError(interaction)
        return channel.send({embeds: [embed]})
    }
}

export default new SendInteraction(CLAN_AD_SEND)