import {Locale} from 'discord.js'
import {EmojiIdentifierResolvable} from 'discord.js/typings'
import {ITranslate} from '../../../services/i18n.js'

export const SERVER_LANGUAGE = 'server_language'
export enum AppLocale {
	EnglishUS = Locale.EnglishUS,
	Russian = Locale.Russian,
	Ukrainian = Locale.Ukrainian
}

export interface LanguageChoice {
	emoji: EmojiIdentifierResolvable
	name: string
	value: AppLocale | typeof SERVER_LANGUAGE
}

export const AppLocaleValues: LanguageChoice[] = [
	{emoji: '🇺🇸', name: 'English, US', value: AppLocale.EnglishUS},
	{emoji: '🇷🇺', name: 'Русский', value: AppLocale.Russian},
	{emoji: '🇺🇦', name: 'Українська', value: AppLocale.Ukrainian}
]

export function languageChoices(t: ITranslate): LanguageChoice[] {
	const arr: LanguageChoice[] = [...AppLocaleValues]
	arr.sort((a, b) => (a.value < b.value ? -1 : 1))
	arr.splice(0, 0, {
		emoji: '🏳️', name: t('language:server_locale'), value: SERVER_LANGUAGE
	})
	return arr
}