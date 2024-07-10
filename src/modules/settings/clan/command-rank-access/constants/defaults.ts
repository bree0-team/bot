import {ClanAccessCommands} from '../../../../clan/enums/ClanCommands.enum.js'
import {
    AllCommandsAccess,
    CaptainCommandsAccess,
    ChiefCommandsAccess,
    MemberCommandsAccess,
    NotAccessCommands,
    RecruiterCommandsAccess
} from '../types/access.type.js'

export const defaultNotAccess: NotAccessCommands[] = [
    ClanAccessCommands.CREATE,
    ClanAccessCommands.LEAVE,
    ClanAccessCommands.LIST,
    ClanAccessCommands.MEMBERS,
    ClanAccessCommands.TRANSFER,
    ClanAccessCommands.APPEARANCE,
    ClanAccessCommands.AD,
    ClanAccessCommands.DELETE
]
export const defaultOwner: AllCommandsAccess[] = [
    ClanAccessCommands.INVITE,
    ClanAccessCommands.KICK,
    ClanAccessCommands.RANK,
    ClanAccessCommands.ROLE_DELETE,
    ClanAccessCommands.ROLE_GIVE,
    ClanAccessCommands.ROLE_LIST,
    ClanAccessCommands.ROLE_NEW,
    ClanAccessCommands.ROLE_RENAME,
]
export const defaultChief: ChiefCommandsAccess[] = [
    ClanAccessCommands.INVITE,
    ClanAccessCommands.KICK,
    ClanAccessCommands.RANK,
    ClanAccessCommands.ROLE_GIVE,
    ClanAccessCommands.ROLE_LIST,
]
export const defaultCaptain: CaptainCommandsAccess[] = [
    ClanAccessCommands.INVITE,
    ClanAccessCommands.RANK,
    ClanAccessCommands.ROLE_LIST,
]
export const defaultRecruiter: RecruiterCommandsAccess[] = [ClanAccessCommands.INVITE, ClanAccessCommands.ROLE_LIST]
export const defaultMember: MemberCommandsAccess[] = [ClanAccessCommands.ROLE_LIST]