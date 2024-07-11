import {readdirSync, readFileSync} from 'fs'
import fs from 'node:fs'
import {defaultLocale} from '../helpers/defaults.js'
import {AppLocale} from '../modules/locale/helpers/consts.js'
import {SplitUtils} from '../utils/split.js'
import {__dirname} from './file.js'

const localePath = __dirname + `/../locales`

type FileName = string
type ITranslateLine = string | [string, string, string]
type I18N = Partial<Record<AppLocale, Record<FileName, Record<string, ITranslateLine>>>>

// todo: idk
export type LocaleArgs = object//{ [name: string]: string | number }
interface InteractionLocaleManager {
    t(key: string, args?: LocaleArgs): string
}
interface LocaleManager {
    t(locale: AppLocale, key: string, args?: LocaleArgs): string
}
export type ITranslate = InteractionLocaleManager['t']


export class LocalizationManager implements LocaleManager {
    #languages: I18N = {}
    #defaultNS: FileName = 'common'
    constructor() {
        this.loadLanguages()
    }

    get languages() {
        return this.#languages
    }

    private loadLanguages() {
        let i18n: I18N = {}
        const appLanguages: string[] = Object.values(AppLocale)
        readdirSync(localePath)
            .filter(t => fs.statSync(`${localePath}/${t}`).isDirectory())
            .filter(locale => appLanguages.includes(locale))
            .forEach((f: AppLocale) => {
                i18n[f] = {}
                readdirSync(`${localePath}/${f}`)
                    .filter(t => t.endsWith('.json') && !t.endsWith('.slash.json'))
                    .forEach(t => {
                        i18n[f][t.replace(".json", "")] = JSON.parse(
                            readFileSync(`${localePath}/${f}/${t}`).toString("utf-8")
                        )
                    })
            })
        this.#languages = i18n
    }

    t(locale: AppLocale, key: string, args?: LocaleArgs): string {
        let language = locale
        if (!(language in this.languages)) language = defaultLocale

        const strings = this.languages[language]

        let [ns, ...values] = key.split(':')

        if (!values.length || !Object.keys(strings).includes(ns)) {
            values = [ns, ...values]
            ns = this.#defaultNS
        }

        const value: ITranslateLine = SplitUtils.findInObject([ns, ...values], strings)
        if (!value) return key
        if (value instanceof Array) {
            let count = 1
            if (args && 'count' in args) count = args.count as number
            return SplitUtils.getEnding(count, ...value)
        }
        if (!args) return value
        return value.replace(/{(\S+)}/g, (_, i) => args[i]?.toString() ?? _)
    }
}