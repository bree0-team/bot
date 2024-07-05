import {PermissionFlagsBits} from "discord.js";

export const defaultClanMemberRight =
    PermissionFlagsBits.ViewChannel |
    PermissionFlagsBits.Connect |
    PermissionFlagsBits.SendMessages
export const defaultClanGuestRight = defaultClanMemberRight
export const defaultNotEveryoneRight = defaultClanMemberRight