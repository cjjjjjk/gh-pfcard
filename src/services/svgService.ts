export function generateSvg(
  username: string,
  followerList: { login: string; avatar_url: string }[]
): string {
  const rectHeight = 22;
  const spacing = 12;
  const paddingX = 20;
  const paddingY = 20;
  const textPadding = 10;
  const startX = paddingX;
  const startY = paddingY;

  const charWidth = 8;
  const maxNameLength = Math.max(...followerList.map(f => f.login.length), 4);
  const maxRectWidth = maxNameLength * charWidth + 30;

  const svgHeight = paddingY * 2 + followerList.length * (rectHeight + spacing) - 10;
  const minWidth = 650;
  const calculatedWidth = maxRectWidth + paddingX * 2;
  const svgWidth = Math.max(calculatedWidth, minWidth);

  const colorPalettes: [string, string][] = [
    ["#FF6FD8", "#3813C2"],
    ["#42E695", "#3BB2B8"],
    ["#F7971E", "#FFD200"],
    ["#56CCF2", "#2F80ED"],
    ["#C471F5", "#FA71CD"],
    ["#F5515F", "#A1051D"],
    ["#30E8BF", "#FF8235"],
    ["#17EAD9", "#6078EA"]
  ];

  const generateRandomGradient = (index: number) => {
    const colors = colorPalettes[index % colorPalettes.length];
    return `
      <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors[0]}" />
        <stop offset="100%" stop-color="${colors[1]}" />
      </linearGradient>
    `;
  };

  const followerItems = followerList
    .map((follower, index) => {
      const x = startX;
      const y = startY + index * (rectHeight + spacing);
      const rectWidth = follower.login.length * charWidth + 40;

      return `
        <g>
          <defs>
            ${generateRandomGradient(index)}
          </defs>
          <rect 
            x="${x}" 
            y="${y}" 
            width="${rectWidth}" 
            height="${rectHeight}" 
            rx="8" 
            ry="8" 
            fill="url(#grad-${index})"
            filter="url(#shadow)"
          />
          <text 
            x="${x + textPadding}" 
            y="${y + rectHeight / 2 + 4}" 
            fill="#fff" 
            font-size="13" 
            font-family="Segoe UI, sans-serif"
            font-weight="600"
            text-anchor="start"
          >
            ${follower.login}
          </text>
        </g>
      `;
    })
    .join("");

  const backgroundDecorations = `
    <defs>
      <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1b1e24" />
        <stop offset="100%" style="stop-color:#2a303d" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="1" dy="1" stdDeviation="3" flood-color="#000" flood-opacity="0.4"/>
      </filter>
      <filter id="glow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- nền chính -->
    <rect width="100%" height="100%" fill="url(#backgroundGradient)" rx="18" ry="18" stroke="#ffffff22" stroke-width="1.5"/>

    <!-- hình tròn mờ -->
    <circle cx="${svgWidth * 0.2}" cy="${svgHeight * 0.8}" r="${Math.min(svgWidth, svgHeight) * 0.25
    }" fill="#ff6fd822" filter="url(#glow)"/>
    <circle cx="${svgWidth * 0.85}" cy="${svgHeight * 0.25}" r="${Math.min(svgWidth, svgHeight) * 0.35
    }" fill="#42e69522" filter="url(#glow)"/>

    <!-- wave pattern -->
    <path d="M0 ${svgHeight * 0.9} Q ${svgWidth * 0.25} ${svgHeight * 0.8
    }, ${svgWidth * 0.5} ${svgHeight * 0.9} T ${svgWidth} ${svgHeight * 0.9
    } V ${svgHeight} H0 Z"
      fill="#ffffff05"/>

    <!-- polygon -->
    <polygon points="${svgWidth * 0.9},40 ${svgWidth - 40},100 ${svgWidth - 80
    },40" fill="#ffffff10"/>
  `;
  return `
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      ${backgroundDecorations}
      ${followerItems}
    </svg>
  `.trim();
}
