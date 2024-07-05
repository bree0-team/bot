import {Locale} from 'discord.js'
import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../handlers/interaction.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import {LOCALE_SELECT} from '../enums/CustomIds.enum.js'
import {languageChoices, SERVER_LANGUAGE} from '../helpers/consts.js'
import {Language} from '../Language.js'
import LocaleManager from '../managers/locale.manager.js'

class LanguageInteraction extends PrivateHandler {
    protected async runValue(
        {interaction, value}: SelectOneValueHandlerOptions<Locale | typeof SERVER_LANGUAGE>
    ) {
        const language = languageChoices(interaction.t)
            .find(i => i.value === value)
        await LocaleManager.createOrUpdate(interaction.user.id, value === SERVER_LANGUAGE ? null : value)
        const embed = GuildEmbed(interaction.guildId)
            .setDescription(interaction.t('language:locale', {language: language.name}))
        await interaction.followUp({embeds: [embed], ephemeral: true})
        return new Language(interaction).run()
    }
}

export default new LanguageInteraction(LOCALE_SELECT)