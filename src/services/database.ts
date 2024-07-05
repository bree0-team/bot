import {ModelCtor, Sequelize} from 'sequelize-typescript'
import {importFiles, require} from './file.js'
import {Logger} from './logger.js'

const Debug = require('../../config/debug.json')

export const sequelize = new Sequelize({
    database: process.env.DB_TABLE,
    host: process.env.DB_HOST,
    define: {charset: process.env.DB_CHARSET || 'utf8mb4'},
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 3306,
    logging: Debug.dummyMode ? msg => Logger.debug(msg) : false,
})

export const importModels = async (): Promise<ModelCtor[]> => {
    const models: ModelCtor[] = []
    await importFiles('modules', '.model', (item) => {
        for (const key in item) if (typeof item[key] === 'function') models.push(item[key])
    })
    return models
}
