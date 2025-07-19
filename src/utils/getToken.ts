declare const GITHUB_PAT: string

export function getToken(): string {
    if (typeof GITHUB_PAT !== 'undefined') {
        return GITHUB_PAT
    }
    return ''
}