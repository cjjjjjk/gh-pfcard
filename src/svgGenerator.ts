export function generateSvg(username: string): string {
    return `
    <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#282c34" />
      <text x="20" y="55" fill="#ffffff" font-size="24" font-family="Arial, sans-serif">
        Hello, ${username}!
      </text>
    </svg>
  `.trim();
}
