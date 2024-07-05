import {Rank} from './Rank.js'
import {BaseUser} from './structures/BaseUser.js'

export class User extends BaseUser {
    async run() {
        const user = this.getUser('user', false) ?? this.user
        return new Rank(this.i).run(user.id)
    }
}