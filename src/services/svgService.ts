export function generateSvg(username: string): string {
    return `
    <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#282c34" />
      <text x="100" y="55" fill="#ffffff" font-size="24" font-family="Arial, sans-serif">
        Hello, ${username}!
      </text>
      <image 
        href="https://avatars.githubusercontent.com/u/179314473?v=4"
        x="20" y="20" width="60" height="60"
      />
    </svg>
  `.trim()
}