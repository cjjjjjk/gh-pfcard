import { cardHandler } from './handlers/cardHandler'

export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)

        if (url.pathname === '/card') {
            return cardHandler(url)
        }

        return new Response('404 Not Found', { status: 404 })
    }
}
