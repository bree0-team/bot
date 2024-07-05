import {StringOptionBuilder, Subcommand, UserOptionBuilder} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {ClanRank} from '../enums/ClanRank.enum.js'
import {Rank} from './Rank.js'

export default new Subcommand(ClanSlashCommands.CLAN, Rank, {
    subcommand: ClanSlashCommands.RANK
}, [
    UserOptionBuilder('user', {required: true}),
    StringOptionBuilder('rank', {
        required: true,
        choices: [
            {name: 'Chief', value: ClanRank.CHIEF},
            {name: 'Captain', value: ClanRank.CAPTAIN},
            {name: 'Recruiter', value: ClanRank.RECRUITER},
            {name: 'Member', value: ClanRank.MEMBER}
        ]
    })
])