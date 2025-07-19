import { generateSvg } from '../services/svgService'
import { getToken } from '../utils/getToken'

export function cardHandler(url: URL): Response {
    const username = url.searchParams.get('username') || 'Guest'
    const token = getToken()
    console.log('Token:', token)

    const svg = generateSvg(username)

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    })
}
