export function generateSvg(
  username: string,
  followerList: { login: string; avatar_url: string }[]
): string {
  const rectHeight = 22;
  const spacing = 10;
  const paddingX = 20;
  const paddingY = 20;
  const textPadding = 10;
  const startX = paddingX;
  const startY = paddingY;

  const charWidth = 8;

  const maxNameLength = Math.max(...followerList.map(f => f.login.length), 4);
  const maxRectWidth = maxNameLength * charWidth + 30;

  const svgHeight = paddingY * 2 + followerList.length * (rectHeight + spacing);
  const svgWidth = maxRectWidth + paddingX * 2;

  const generateRandomGradient = (index: number) => {
    const color1 = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    const color2 = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    return `
      <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    `;
  };

  const followerItems = followerList
    .map((follower, index) => {
      const x = startX;
      const y = startY + index * (rectHeight + spacing);
      const rectWidth = follower.login.length * charWidth + 30;

      return `
        <g filter="url(#shadow)">
          <defs>
            ${generateRandomGradient(index)}
          </defs>
          <rect 
            x="${x}" 
            y="${y}" 
            width="${rectWidth}" 
            height="${rectHeight}" 
            rx="6" 
            ry="6" 
            fill="url(#grad-${index})"
          />
          <text 
            x="${x + textPadding}" 
            y="${y + rectHeight / 2 + 4}" 
            fill="#fff" 
            font-size="13" 
            font-family="Arial, sans-serif"
            font-weight="600"
            text-anchor="start"
          >
            ${follower.login}
          </text>
        </g>
      `;
    })
    .join("");

  return `
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#1b1e24" rx="12" ry="12"/>
      ${followerItems}

    </svg>
  `.trim();
}
