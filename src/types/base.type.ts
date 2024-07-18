import {Snowflake} from 'discord.js'

export type ValueOf<T> = T[keyof T]

export type CustomId = string
export type GuildId = Snowflake
export type ChannelId = Snowflake
export type UserId = Snowflake
export type MessageId = Snowflake
export type RoleId = Snowflake