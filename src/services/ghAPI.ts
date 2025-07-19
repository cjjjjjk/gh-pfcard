import { getToken } from "../utils/getToken";

const gitHubAPI = "https://api.github.com/users/"

export const getGitHUbFlower = async function (username: string, env: { GITHUB_PAT: string }) {
    try {
        const token = getToken(env);
        const response = await fetch(`${gitHubAPI}${username}/followers`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Cloudflare-Worker-GitHub-Proxy'
            }
        });

        const data = await response.json();
        const followerList = data.map((follower: any) => {
            return {
                login: follower.login,
                avatar_url: follower.avatar_url
            }
        })

        return {
            isSucces: true,
            followerList: followerList
        };
    } catch (err: any) {
        return {
            isSucceed: false,
            followerList: [],
            errorMessage: err.message
        }
    }
}
