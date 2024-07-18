import {UserId} from '../types/base.type.js'

export class UrlUtils {
    static user = (userId: UserId): string => 'discord://-/users/' + userId
    static isValidHttpUrl(url: string): boolean {
        let finalUrl: URL;

        try {
            finalUrl = new URL(url)
        } catch (_) {
            return false
        }

        return finalUrl.protocol === "http:" || finalUrl.protocol === "https:"
    }

    static isValidUrl(url: string) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    }
}