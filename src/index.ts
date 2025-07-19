import { cardHandler } from './handlers/cardHandler'
import { getGitHUbFlower } from './services/ghAPI';

export default {
    async fetch(request: Request, env: { GITHUB_PAT: string }): Promise<Response> {
        const url = new URL(request.url)

        if (url.pathname === '/user') {
            return cardHandler(url, env)
        }

        return new Response('404 Not Found', { status: 404 })
    }
}
