import {ClanAccessCommands} from '../../../../clan/enums/ClanCommands.enum.js'

export type NotAccessCommands =
    ClanAccessCommands.CREATE |
    ClanAccessCommands.LEAVE |
    ClanAccessCommands.LIST |
    ClanAccessCommands.MEMBERS |
    ClanAccessCommands.TRANSFER |
    ClanAccessCommands.APPEARANCE |
    ClanAccessCommands.AD

export type AllCommandsAccess = Exclude<ClanAccessCommands, NotAccessCommands>
export type ChiefCommandsAccess = Exclude<AllCommandsAccess,
    ClanAccessCommands.ROLE_DELETE |
    ClanAccessCommands.ROLE_NEW |
    ClanAccessCommands.ROLE_RENAME>
export type CaptainCommandsAccess = Exclude<ChiefCommandsAccess,
    ClanAccessCommands.KICK |
    ClanAccessCommands.ROLE_GIVE>
export type RecruiterCommandsAccess = Exclude<CaptainCommandsAccess, ClanAccessCommands.RANK>
export type MemberCommandsAccess = Exclude<RecruiterCommandsAccess, ClanAccessCommands.INVITE>