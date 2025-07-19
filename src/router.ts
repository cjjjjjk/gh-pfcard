import { cardHandler } from './handlers/cardHandler'
import { proxyHandler } from './handlers/proxyHandler'

type Env = {
    GITHUB_PAT: string
}

class Router {
    async handle(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url)
        const pathname = url.pathname

        if (pathname === '/user') {
            return cardHandler(url, env)
        }

        if (pathname === '/proxy') {
            return proxyHandler(url)
        }

        return new Response('404 Not Found', { status: 404 })
    }
}

export const router = new Router()
