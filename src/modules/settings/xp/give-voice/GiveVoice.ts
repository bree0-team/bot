import {bold, inlineCode, InteractionReplyOptions} from 'discord.js'
import _ from 'lodash'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {defaultVoiceGive} from '../constants/defaults.js'
import {XpSelectValues} from '../enums/CustomIds.enum.js'
import SettingsXpManager from '../managers/settings-xp.manager.js'
import {BaseSettingsXp} from '../structures/BaseSettingsXp.js'
import {VOICE_GIVE, VOICE_GIVE_RESET} from './enums/CustomIds.enum.js'

export class GiveVoice extends BaseSettingsXp {
    async run() {
        const {voiceGive} = await SettingsXpManager.getOne(this.guildId)
        const [from, to] = voiceGive
        const embed = this.embed()
            .setDescription([
                this.t('settings:xp:voice_give'),
                '',
                bold(this.t('xp') + ': ') + this.t('from').toLowerCase() + ' '
                + inlineCode(from.toString()) + ' ' + this.t('to').toLowerCase() + ' ' + inlineCode(to.toString())
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(XpSelectValues.GiveVoice),
            this.back(MAIN_SELECT,
                this.editReset(VOICE_GIVE, VOICE_GIVE_RESET, _.isEqual(voiceGive, defaultVoiceGive))
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}