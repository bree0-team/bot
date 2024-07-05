import {RepliableInteraction} from 'discord.js'
import {SplitUtils} from '../utils/split.js'

export const duration = (interaction: RepliableInteraction, duration: number, space: string = ' '): string =>
    Object.entries(SplitUtils.getDuration(duration))
        .map(([key, value]) => value + space + interaction.t('counts:' + key, {count: value}))
        .join(' ')
export const years = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:years', {count})
export const months = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:months', {count})
export const weeks = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:weeks', {count})
export const days = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:days', {count})
export const hours = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:hours', {count})
export const minutes = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:minutes', {count})
export const seconds = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:seconds', {count})

export const messages = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:messages', {count})
export const users = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:users', {count})
export const channels = (interaction: RepliableInteraction, count: number): string =>
    count + ' ' + interaction.t('counts:channels', {count})