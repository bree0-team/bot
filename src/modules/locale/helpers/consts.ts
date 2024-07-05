import {Locale} from 'discord.js'
import {ITranslate} from '../../../services/i18n.js'

export const SERVER_LANGUAGE = 'server_language'

export interface LanguageChoice {
	emoji: string
	name: string
	value: Locale | typeof SERVER_LANGUAGE
}

export const languageChoices = (t: ITranslate): LanguageChoice[] => [
	{emoji: '🏳️', name: t('language:server_locale'), value: SERVER_LANGUAGE},
	{emoji: '🇺🇸', name: 'English, US', value: Locale.EnglishUS},
	{emoji: '🇷🇺', name: 'Русский', value: Locale.Russian},
	{emoji: '🇺🇦', name: 'Українська', value: Locale.Ukrainian}
]