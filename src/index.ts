import { router } from './router'

export default {
    fetch(request: Request, env: { GITHUB_PAT: string }): Promise<Response> {
        return router.handle(request, env)
    }
}
