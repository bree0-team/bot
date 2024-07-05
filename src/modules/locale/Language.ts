import {InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {InteractionEmoji} from '../../enums/InteractionEmoji.enum.js'
import {GuildEmbed} from '../../helpers/embed.js'
import {StringSelectRowBuilder} from '../../services/interaction.js'
import {BaseStructure} from '../../structures/base.js'
import {LOCALE_SELECT} from './enums/CustomIds.enum.js'
import {languageChoices, SERVER_LANGUAGE} from './helpers/consts.js'
import LocaleManager from './managers/locale.manager.js'

export class Language extends BaseStructure {
    async run() {
        const locale = LocaleManager.getLocale(this.userId) || SERVER_LANGUAGE
        const toStringLocale = languageChoices(this.t)
            .find(i => i.value === locale)
        const embed = GuildEmbed(this.guildId)
            .setDescription([
                this.t('language:chose_lang'),
                '',
                InteractionEmoji.MINUS + ' ' + this.t('language:selected_lang') + ': '
                + `\`${toStringLocale.name}\``
            ].join('\n'))
        const select = new StringSelectMenuBuilder()
            .setCustomId(LOCALE_SELECT)
            .setOptions(
                languageChoices(this.t).map(i => new StringSelectMenuOptionBuilder()
                    .setEmoji(i.emoji)
                    .setLabel(i.name)
                    .setValue(i.value)
                    .setDefault(i.value === toStringLocale.value))
            )
        const row = StringSelectRowBuilder(select)
        const replyData: InteractionReplyOptions = {embeds: [embed], components: [row]}
        return this.reply({replyData})
    }
}