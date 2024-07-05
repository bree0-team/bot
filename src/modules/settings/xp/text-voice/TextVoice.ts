import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import _ from 'lodash'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {VoiceStatesEmoji} from '../../../../enums/VoiceStatesEmoji.enum.js'
import {CheckEmoji} from '../../../../helpers/buttons.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {XpSelectValues} from '../enums/CustomIds.enum.js'
import {XpType} from '../enums/XpType.enum.js'
import SettingsXpManager from '../managers/settings-xp.manager.js'
import {BaseSettingsXp} from '../structures/BaseSettingsXp.js'
import {XP_TYPE, XP_VOICE_STATES} from './enums/CustomIds.enum.js'

export class TextVoice extends BaseSettingsXp {
    xpTypeRow(xpTypes?: XpType[]): ActionStringSelectRow {
        const values = _.values(XpType) as XpType[]
        const select = new StringSelectMenuBuilder({
            customId: XP_TYPE,
            placeholder: this.t('settings:xp:text_voice:select'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            label: this.t('settings:xp:text_voice:' + i),
            value: i,
            default: xpTypes.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    voiceStatesRow(disabled: boolean, voiceStates?: VoiceStates[]): ActionStringSelectRow {
        const values = _.values(VoiceStates) as VoiceStates[]
        const select = new StringSelectMenuBuilder({
            customId: XP_VOICE_STATES, disabled,
            placeholder: this.t('select:voice_states:placeholder'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            emoji: VoiceStatesEmoji[i],
            label: this.t('select:voice_states:' + i),
            value: i,
            default: voiceStates.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    async run() {
        const xpManager = await SettingsXpManager.getOne(this.guildId)
        const existVoice = xpManager.xpTypes.includes(XpType.VOICE)
        const embed = this.embed()
            .setDescription([
                bold(this.t('settings:xp:text_voice:description') + ':'),
                _.map(XpType, i => CheckEmoji(xpManager.xpTypes.includes(i)) + ' '
                    + this.t('settings:xp:text_voice:' + i)).join('\n'),
                '',
                existVoice ? [
                    bold(this.t('voice_states') + ':'),
                    _.map(VoiceStates, i => CheckEmoji(xpManager.voiceStates.includes(i)) + ' '
                        + this.t('select:voice_states:' + i)).join('\n')
                ].join('\n') : '',
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(XpSelectValues.TextVoice),
            this.xpTypeRow(xpManager.xpTypes),
            this.voiceStatesRow(!existVoice, xpManager.voiceStates),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}