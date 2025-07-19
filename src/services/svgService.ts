import { METADATA } from "../metadata";

export function generateSvg(username: string, followerList: { login: string, avatar_url: string }[]): string {
  const displayedFollowers = followerList.slice(0, 8);
  const avatarSize = 60;
  const spacing = 20;
  const startX = 20;
  const startY = 40;

  const followerItems = displayedFollowers.map((follower, index) => {
    const x = startX + index * (avatarSize + spacing);
    const y = startY - 10;

    return `
      <g>
        <image 
          x="${x}" 
          y="${y}" 
          width="${avatarSize}" 
          height="${avatarSize}"
          xlink:href="${`${METADATA.APP_URL}/proxy?url=${encodeURIComponent(follower.avatar_url)}`}"
          clip-path="url(#clip-${index})"
        />
        <defs>
          <clipPath id="clip-${index}">
            <circle cx="${x + avatarSize / 2}" cy="${y + avatarSize / 2}" r="${avatarSize / 2}" />
          </clipPath>
        </defs>
        <text 
          x="${x + avatarSize / 2}" 
          y="${y + avatarSize + 15}" 
          fill="#ffffff" 
          font-size="12" 
          font-family="Arial, sans-serif"
          text-anchor="middle"
          font-weight="bold"
          stroke="#000"
          stroke-width="1"
          paint-order="stroke"
        >
          ${follower.login.length > 6 ? follower.login.substring(0, 6) + '..' : follower.login}
        </text>
      </g>
    `;
  }).join('');

  return `
    <svg width="700" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="100%" height="100%" fill="#1e2127" rx="10" ry="10"/>
      ${followerItems}
      <text 
        x="680" 
        y="140" 
        fill="#888888" 
        font-size="12" 
        font-family="Arial, sans-serif"
        text-anchor="end"
      >
        Total Followers: ${followerList.length}
      </text>
    </svg>
  `.trim();
}
