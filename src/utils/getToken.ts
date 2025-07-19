export function getToken(env: { GITHUB_PAT: string }): string {
    return env.GITHUB_PAT || 'get-token-false';
}
