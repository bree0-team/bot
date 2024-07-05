import {importFilesDefault} from '../../../services/file.js'
import {Logger} from '../../../services/logger.js'
import {ModelManager} from '../../../managers/model.js'

export const setManagers = async (): Promise<void> =>
    importFilesDefault<ModelManager<any, any>>('modules', '.manager',
    async (manager) => {
        if (manager) {
            await manager.setAll()
            Logger.debug(manager.constructor.name + ' stored')
        }
    })