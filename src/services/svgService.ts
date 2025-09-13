export function generateSvg(
  username: string,
  followerList: { login: string; avatar_url: string }[],
  pLanguages?: string[],
  limitFlowerShow: number = 10
): string {
  const rectHeight = 22;
  const spacing = 12;
  const paddingX = 20;
  const paddingY = 20;
  const textPadding = 10;
  const startX = paddingX;
  const startY = paddingY;

  const charWidth = 8;

  const showFollowers = followerList.slice(0, limitFlowerShow);

  const maxNameLength = Math.max(...showFollowers.map(f => f.login.length), 4);
  const maxRectWidth = maxNameLength * charWidth + 30;

  // count heigh, min is 2 flower even not show any
  const svgHeight = Math.max(paddingY * 2 + showFollowers.length * (rectHeight + spacing) - 10, paddingY * 2 + 2 * (rectHeight + spacing) - 10);
  const minWidth = 746.66;
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

  const languageColors: Record<string, string> = {
    ts: "#3178c6",
    js: "#f1e05a",
    py: "#3572A5",
    cpp: "#f34b7d",
    java: "#b07219",
    cs: "#178600",
    go: "#00ADD8",
    php: "#4F5D95",
    rb: "#701516",
    html: "#ED775A",
    css: "#33A1E0"
  };

  // New language network visualization
  const languageTags = (pLanguages ?? []).length > 0 ? (() => {
    const centerX = svgWidth * 0.7;
    const centerY = svgHeight * 0.5;
    const radius = Math.min(svgWidth * 0.25, svgHeight * 0.4);
    const nodes = pLanguages!.map((lang, idx) => {
      const angle = (idx / pLanguages!.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { lang, x, y };
    });

    // Generate connections (each node connects to 2-3 random other nodes)
    const connections: { from: number; to: number }[] = [];
    nodes.forEach((_, idx) => {
      const numConnections = Math.floor(Math.random() * 2) + 1;
      const possibleTargets = Array.from({ length: nodes.length }, (_, i) => i)
        .filter(i => i !== idx);
      const targets = possibleTargets
        .sort(() => Math.random() - 0.5)
        .slice(0, numConnections);
      targets.forEach(target => {
        // Avoid duplicate connections
        if (!connections.some(c => (c.from === idx && c.to === target) || (c.from === target && c.to === idx))) {
          connections.push({ from: idx, to: target });
        }
      });
    });

    // Generate SVG elements for connections
    const connectionLines = connections.map(({ from, to }) => {
      const fromNode = nodes[from];
      const toNode = nodes[to];
      return `
        <line 
          x1="${fromNode.x}" 
          y1="${fromNode.y}" 
          x2="${toNode.x}" 
          y2="${toNode.y}" 
          stroke="#fff" 
          stroke-width="1.5"
          stroke-opacity="0.6"
        />
      `;
    }).join("");

    // Generate SVG elements for language nodes
    const languageNodes = nodes.map(({ lang, x, y }) => {
      const fill = languageColors[lang] ?? "#666";
      const width = Math.max(20, lang.length * 12);
      const height = 24;
      const rectX = x - width / 2;
      const rectY = y - height / 2;

      return `
    <g>
      <rect
        x="${rectX}"
        y="${rectY}"
        width="${width}"
        height="${height}"
        fill="${fill}"
        filter="url(#glow)"
      />
      <text
        x="${x}"
        y="${y + 4}"
        fill="#fff"
        font-size="12"
        font-family="Segoe UI, sans-serif"
        font-weight="700"
        text-anchor="middle"
      >
        ${lang}
      </text>
    </g>
  `;
    }).join("");


    return connectionLines + languageNodes;
  })() : "";

  const generateRandomGradient = (index: number) => {
    const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    return `
    <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors[0]}" />
      <stop offset="100%" stop-color="${colors[1]}" />
    </linearGradient>
  `;
  };

  const followerItems = showFollowers
    .sort(() => Math.random() - 0.5)
    .map((follower, index) => {
      const x = startX;
      const y = startY + index * (rectHeight + spacing);
      const rectWidth = follower.login.length * charWidth + 20;

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

    <rect width="100%" height="100%" fill="url(#backgroundGradient)" rx="18" ry="18" stroke="#ffffff22" stroke-width="1.5"/>

    <circle cx="${svgWidth * 0.2}" cy="${svgHeight * 0.8}" r="${Math.min(svgWidth, svgHeight) * 0.25
    }" fill="#ff6fd822" filter="url(#glow)"/>
    <circle cx="${svgWidth * 0.85}" cy="${svgHeight * 0.25}" r="${Math.min(svgWidth, svgHeight) * 0.35
    }" fill="#42e69522" filter="url(#glow)"/>

    <path d="M0 ${svgHeight * 0.9} Q ${svgWidth * 0.25} ${svgHeight * 0.8
    }, ${svgWidth * 0.5} ${svgHeight * 0.9} T ${svgWidth} ${svgHeight * 0.9
    } V ${svgHeight} H0 Z"
      fill="#ffffff05"/>

    <polygon points="${svgWidth * 0.9},40 ${svgWidth - 40},100 ${svgWidth - 80
    },40" fill="#ffffff10"/>
  `;
  return `
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      ${backgroundDecorations}
      ${followerItems}
      ${languageTags}
    </svg>
  `.trim();
}