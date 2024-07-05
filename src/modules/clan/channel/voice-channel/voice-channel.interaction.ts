import {ChannelType} from 'discord.js'
import {ButtonHandlerOptions, PublicHandler} from '../../../../handlers/interaction.js'
import {InteractionUtils} from '../../../../utils/interaction.js'
import SettingsClanChannelManager from '../../../settings/clan/channel/managers/settings-clan-channel.manager.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {NamePatternUtils} from '../../utils/name-pattern.js'
import {ClanChannelButtonCustomIds} from '../enums/CustomIds.enum.js'
import {ClanChannelLimitExceededError} from '../errors/clan-channel.error.js'
import {allCheck} from '../helpers/allCheck.js'
import {voiceChannelOverwrite} from '../helpers/channelOverwrite.js'
import ClanChannelManager from '../managers/clan-channel.manager.js'

class VoiceChannelInteraction extends PublicHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {clan, category} = await allCheck(interaction)
        const channelManager = await SettingsClanChannelManager.getOne(interaction.guildId)
        if (ClanChannelManager.findAllByClanId(clan.id).size >= channelManager.limit)
            throw new ClanChannelLimitExceededError(interaction)
        const voiceChannel = await InteractionUtils.createChannel(interaction, {
            type: ChannelType.GuildVoice,
            name: await NamePatternUtils.getPattern(clan),
            parent: category.id,
            permissionOverwrites: voiceChannelOverwrite(interaction.client.user, interaction.guildId, clan.id)
        })
        await ClanChannelManager.create(interaction.guildId, voiceChannel.id, clan.id, {
            name: await NamePatternUtils.getPattern(clan)
        })
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:voice_channel', {
                channel: voiceChannel
            }))
        return interaction.followUp({embeds: [embed], ephemeral: true})
    }
}

export default new VoiceChannelInteraction(ClanChannelButtonCustomIds.VoiceChannel)