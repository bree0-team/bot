import {Data} from './Data.js'
import {BaseMun} from './structures/BaseMun.js'

export class User extends BaseMun {
    async run() {
        const user = this.getUser('user', false) ?? this.user
        return new Data(this.i).run(user.id)
    }
}