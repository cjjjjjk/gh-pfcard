export async function proxyHandler(url: URL): Promise<Response> {
    const targetUrl = url.searchParams.get('url')
    if (!targetUrl) return new Response('Missing URL', { status: 400 })

    try {
        const res = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://github.com'
            },
            // ép kiểu tại đây
            cf: {
                cacheEverything: true,
                cacheTtl: 86400
            }
        } as unknown as RequestInit)

        return new Response(res.body, {
            status: res.status,
            headers: {
                'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
                'Cache-Control': 'public, max-age=86400'
            }
        })
    } catch (err) {
        return new Response('Failed to proxy image', { status: 500 })
    }
}
