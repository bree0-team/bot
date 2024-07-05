import {bold, codeBlock, InteractionReplyOptions, TextChannel, VoiceChannel} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import ClanChannelManager from '../../../clan/channel/managers/clan-channel.manager.js'
import ClanManager from '../../../clan/managers/clan.manager.js'
import {NamePatternUtils} from '../../../clan/utils/name-pattern.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {defaultNamePattern} from '../constants/defaults.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsClanManager from '../managers/settings-clan.manager.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {NAME_PATTERN, NAME_PATTERN_RESET} from './enums/CustomIds.enum.js'

export class NamePattern extends BaseSettingsClan {
    async run() {
        const {name_pattern} = await SettingsClanManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:name_pattern:description'),
                '',
                bold(this.t('settings:clan:name_pattern:pattern') + ': '),
                codeBlock(name_pattern)
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.NamePattern),
            this.back(MAIN_SELECT,
                this.editReset(NAME_PATTERN, NAME_PATTERN_RESET, name_pattern === defaultNamePattern)
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
    async change_channel_name(oldNamePattern: string) {
        const {name_pattern} = await SettingsClanManager.getOne(this.guildId)
        const channels = ClanChannelManager.findAllByGuildId(this.guildId)
            .map(i => i)
        for (const channelModel of channels) {
            const channel = this.guild.channels
                .resolve(channelModel.channelId) as (TextChannel | VoiceChannel)
            const clan = ClanManager.findOne(channelModel.clanId)
            const oldName = NamePatternUtils.get(oldNamePattern, clan.emoji, clan.name)
            const newName = NamePatternUtils.get(name_pattern, clan.emoji, clan.name)
            if (!channelModel.name.includes(oldName)) continue;
            channel.edit({name: channelModel.name.replace(oldName, newName)})
            ClanChannelManager.update(channel.id, {name: channelModel.name.replace(oldName, newName)})
        }
    }
}