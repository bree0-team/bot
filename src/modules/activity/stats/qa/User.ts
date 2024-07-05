import {Data} from './Data.js'
import {BaseQa} from './structures/BaseQa.js'

export class User extends BaseQa {
    async run() {
        const user = this.getUser('user', false) ?? this.user
        const channel = this.getChannel('channel')
        return new Data(this.i).run(user.id, channel.id)
    }
}