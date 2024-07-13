import fs from 'node:fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const __filename = import.meta.url
export const __dirname = (url: string | URL) => dirname(fileURLToPath(url))

export function getFiles(dir: string, files: string[] = []): string[] {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
        const name = `${dir}/${file}`
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files)
        } else {
            files.push(name)
        }
    }
    return files
}

/**
 * Получить отфильтрованные файлы
 * @param pathName {string} - название папки
 * @param filesName {string} - окончание файлов для фильтрации
 * @return {string[]}
 */
export function getFilteredFiles(pathName: string, filesName: string = ''): string[] {
    const filesPath = join(__dirname(__filename), '..', pathName)
    return getFiles(filesPath).filter(file => file.endsWith(`${filesName}.js`))
}

export async function importFilesDefault<T>(
    pathName: string,
    filesName: string,
    callback: (item: T, file: string) => void
): Promise<void> {
    return importFiles(pathName, filesName, async (module, file) => {
        const item: T = module.default
        await callback(item, file)
    })
}

export async function importFiles(
    pathName: string,
    filesName: string,
    callback: (item, file: string) => void
): Promise<void> {
    const files = getFilteredFiles(pathName, filesName)
    for (const file of files) {
        const item = await import(file)
        await callback(item, file)
    }
}