import { getGitHUbFlower } from '../services/ghAPI'
import { generateSvg } from '../services/svgService'

export async function cardHandler(url: URL, env: { GITHUB_PAT: string }): Promise<Response> {
    const username = url.searchParams.get('username') || 'cjjjjjk'

    //ts-py-js-cpp
    const programingLanguageParam: string = url.searchParams.get('pl') || ""
    let languages: string[] = []
    if (programingLanguageParam.length > 0) {
        languages = programingLanguageParam.split('-')
    }

    const followerList = await getGitHUbFlower(username, env)
    const svg = generateSvg(username, followerList.followerList, languages)

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    })
}
