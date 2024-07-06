import {
    AnySelectMenuInteraction,
    bold,
    channelMention,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    TextChannel,
    UserSelectMenuBuilder,
    VoiceChannel
} from 'discord.js'
import _ from 'lodash'
import {DiscordEmoji} from '../../../../enums/DiscordEmoji.enum.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {
    ActionStringSelectRow,
    ActionUserSelectRow,
    InteractionReplyComponent,
    iReply,
    StringEmptyOption,
    StringSelectRowBuilder,
    UserSelectRowBuilder
} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {ClanModel} from '../../models/clan.model.js'
import {allCheck} from '../helpers/allCheck.js'
import {ChannelRightsData} from '../types/data.type.js'
import {
    CLAN_CHANNEL_RIGHTS_ADD_SELECT,
    CLAN_CHANNEL_RIGHTS_REMOVE_SELECT,
    CLAN_CHANNEL_RIGHTS_SELECT
} from './enums/CustomIds.enum.js'

class RightsSelectedInteraction extends PublicHandler {
    private addRightsRow(interaction: AnySelectMenuInteraction): ActionUserSelectRow {
        const select = new UserSelectMenuBuilder({
            customId: CLAN_CHANNEL_RIGHTS_ADD_SELECT,
            placeholder: interaction.t('clan:channel:rights:select:add'),
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        return UserSelectRowBuilder(select)
    }
    private async removeRightsRow(
        interaction: AnySelectMenuInteraction,
        values: ChannelId[],
        clan: ClanModel
    ): Promise<ActionStringSelectRow> {
        const overwrites: string[] = []
        for (const channelId of values) {
            const channel = interaction.guild.channels
                .resolve(channelId) as (TextChannel | VoiceChannel)
            const overwrite = channel.permissionOverwrites.cache
                .filter(i => {
                    if (interaction.client.user.id === i.id) return false;
                    if (interaction.guildId === i.id) return false;
                    return !ClanMemberManager.findOne(clan.id, i.id)
                })
                .map(i => i.id)
            overwrites.push(...overwrite)
        }
        const overwritesUniq = _.uniq(overwrites) as string[]
        const select = new StringSelectMenuBuilder({
            customId: CLAN_CHANNEL_RIGHTS_REMOVE_SELECT,
            placeholder: interaction.t('clan:channel:rights:select:remove'),
            maxValues: overwritesUniq.length || 1,
        }).setOptions(...(await Promise.all(overwritesUniq.map(async i => {
            const user = await interaction.guild.members.fetch(i)
            return new StringSelectMenuOptionBuilder()
                .setEmoji(DiscordEmoji.Mention)
                .setLabel(user.displayName)
                .setValue(i)
        }))))
        if (!overwritesUniq.length) select.setDisabled(true).setOptions(StringEmptyOption)
        return StringSelectRowBuilder(select)
    }
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<ChannelId>) {
        const {clan} = await allCheck(interaction)
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription([
                interaction.t('clan:channel:rights:description'),
                '',
                bold(interaction.t('select:ed_channels') + ': ') + values.map(i => channelMention(i))
                    .join(', ')
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.addRightsRow(interaction),
            await this.removeRightsRow(interaction, values, clan)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: ChannelRightsData = {channels: values}
        return iReply({interaction, replyData, data})
    }
}

export default new RightsSelectedInteraction(CLAN_CHANNEL_RIGHTS_SELECT)