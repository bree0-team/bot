import {bold, inlineCode, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {defaultFormula} from '../constants/defaults.js'
import {XpSelectValues} from '../enums/CustomIds.enum.js'
import SettingsXpManager from '../managers/settings-xp.manager.js'
import {BaseSettingsXp} from '../structures/BaseSettingsXp.js'
import {FORMULA_GIVE, FORMULA_GIVE_RESET} from './enums/CustomIds.enum.js'

export class Formula extends BaseSettingsXp {
    async run() {
        const {formula} = await SettingsXpManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:xp:formula:description'),
                '',
                bold(this.t('settings:xp:formula:label') + ': ') + inlineCode(formula),
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(XpSelectValues.Formula),
            this.back(MAIN_SELECT,
                this.editReset(FORMULA_GIVE, FORMULA_GIVE_RESET, formula === defaultFormula)
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}