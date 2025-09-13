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

    const raw = url.searchParams.get('limit');
    const value = parseInt(raw ?? "", 10);

    const limitFollowerShow: number = !Number.isNaN(value) && value >= 0 && value <= 10 ? value : 10;

    const followerList = await getGitHUbFlower(username, env)
    const svg = generateSvg(username, followerList.followerList, languages, limitFollowerShow)

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    })
}
