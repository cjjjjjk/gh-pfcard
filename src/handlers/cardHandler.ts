import { getGitHUbFlower } from '../services/ghAPI'
import { generateSvg } from '../services/svgService'

export async function cardHandler(url: URL, env: { GITHUB_PAT: string }): Promise<Response> {
    const username = url.searchParams.get('username') || 'cjjjjjk'

    const followerList = await getGitHUbFlower(username, env)
    const svg = generateSvg(username, followerList.followerList)

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    })
}
