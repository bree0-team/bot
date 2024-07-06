import {Locale} from 'discord.js'
import {ITranslate} from '../../../services/i18n.js'
import {ValueOf} from '../../../types/base.type.js'

export const SERVER_LANGUAGE = 'server_language'

enum BotLocale {
	Belarusian = 'be'
}
const AppLocale = {...Locale, ...BotLocale}
export type AppLocaleValues = ValueOf<typeof AppLocale>

export interface LanguageChoice {
	emoji: string
	name: string
	value: AppLocaleValues | typeof SERVER_LANGUAGE
}

export function languageChoices(t: ITranslate): LanguageChoice[] {
	const arr: LanguageChoice[] = [
		{emoji: '🇧🇾', name: 'Беларускі', value: BotLocale.Belarusian},
		{emoji: '🇺🇸', name: 'English, US', value: Locale.EnglishUS},
		{emoji: '🇷🇺', name: 'Русский', value: Locale.Russian},
		{emoji: '🇺🇦', name: 'Українська', value: Locale.Ukrainian}
	]
	arr.sort((a, b) => (a.value < b.value ? -1 : 1))
	arr.splice(0, 0, {
		emoji: '🏳️', name: t('language:server_locale'), value: SERVER_LANGUAGE
	})
	return arr
}