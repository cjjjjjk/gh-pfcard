export function generateSvg(
  username: string,
  followerList: { login: string; avatar_url: string }[],
  pLanguages?: string[],
  limitFlowerShow: number = 10,
  theme: string = "default"
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
  const minWidth = 1000;
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
    // Cấu hình khoảng cách cho Zigzag
    const gapX = 80;       // Khoảng cách ngang giữa các node
    const zigzagY = 35;    // Độ lệch dọc (biên độ zigzag)

    // Tính toán vị trí bắt đầu để căn giữa cụm node vào vùng trống bên phải (khoảng 75% width)
    const totalContentWidth = (pLanguages!.length - 1) * gapX;
    const centerRegionX = svgWidth * 0.75;
    const startNodeX = centerRegionX - (totalContentWidth / 2);
    const centerNodeY = svgHeight * 0.5;

    const nodes = pLanguages!.map((lang, idx) => {
      // random offset for more organic look
      const randomOffsetX = (Math.random() - 0.5) * 20;
      const randomOffsetY = (Math.random() - 0.5) * 20;

      // vị trí X tăng dần
      const x = startNodeX + (idx * gapX) + randomOffsetX;

      // vị trí Y thay đổi lên xuống (chẵn lên, lẻ xuống)
      // idx % 2 === 0 ? -zigzagY (lên) : +zigzagY (xuống)
      const y = centerNodeY + ((idx % 2 === 0) ? -zigzagY : zigzagY) + randomOffsetY;

      return { lang, x, y };
    });

    // Tạo đường nối tuần tự (0->1, 1->2, ...)
    const connectionLines = nodes.slice(0, -1).map((node, idx) => {
      const nextNode = nodes[idx + 1];
      const isWireframe = theme === 'wireframe';
      const lineStroke = isWireframe ? "#000" : "#fff";
      const lineOpacity = isWireframe ? "0.3" : "0.5";
      const lineFilter = isWireframe ? 'filter="url(#sketch)"' : '';

      return `
        <line 
          x1="${node.x}" 
          y1="${node.y}" 
          x2="${nextNode.x}" 
          y2="${nextNode.y}" 
          stroke="${lineStroke}" 
          stroke-width="2"
          stroke-opacity="${lineOpacity}"
          ${lineFilter}
        />
      `;
    }).join("");

    // Generate SVG elements for language nodes
    const languageNodes = nodes.map(({ lang, x, y }) => {
      const isWireframe = theme === 'wireframe';
      const fill = isWireframe ? "#ffffff" : (languageColors[lang] ?? "#666");
      const stroke = isWireframe ? "#000000" : "none";
      const textColor = isWireframe ? "#000000" : "#fff";
      const fontFamily = isWireframe ? "'Comic Sans MS', 'Chalkboard SE', 'Segoe Print', cursive" : "Segoe UI, sans-serif";
      const filter = isWireframe ? "url(#sketch)" : "url(#glow)";

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
        stroke="${stroke}"
        stroke-width="${isWireframe ? 2 : 0}"
        filter="${filter}"
        rx="4"
      />
      <text
        x="${x}"
        y="${y + 4}"
        fill="${textColor}"
        font-size="12"
        font-family="${fontFamily}"
        font-weight="${isWireframe ? 'normal' : '700'}"
        text-anchor="middle"
      >
        ${lang}
      </text>
    </g>
  `;
    }).join("");


    return connectionLines + languageNodes;
  })() : "";

  const followerItems = showFollowers
    .sort(() => Math.random() - 0.5)
    .map((follower, index) => {
      const x = startX;
      const y = startY + index * (rectHeight + spacing);
      const rectWidth = follower.login.length * charWidth + 20;

      const isWireframe = theme === 'wireframe';
      const rectFill = isWireframe ? "#ffffff" : "#2d3748";
      const rectStroke = isWireframe ? "#000000" : "#4a5568";
      const rectStrokeWidth = isWireframe ? 2 : 1;
      const textFill = isWireframe ? "#000000" : "#e2e8f0";
      const fontFamily = isWireframe ? "'Comic Sans MS', 'Chalkboard SE', 'Segoe Print', cursive" : "Segoe UI, sans-serif";
      const filter = isWireframe ? "url(#sketch)" : "";

      return `
        <g>
          <rect 
            x="${x}" 
            y="${y}" 
            width="${rectWidth}" 
            height="${rectHeight}" 
            rx="6" 
            ry="6" 
            fill="${rectFill}"
            stroke="${rectStroke}"
            stroke-width="${rectStrokeWidth}"
            filter="${filter}"
          />
          <text 
            x="${x + textPadding}" 
            y="${y + rectHeight / 2 + 4}" 
            fill="${textFill}" 
            font-size="13" 
            font-family="${fontFamily}"
            font-weight="500"
            text-anchor="start"
          >
            ${follower.login}
          </text>
        </g>
      `;
    })
    .join("");

  const isWireframe = theme === 'wireframe';

  const backgroundDecorations = isWireframe ? `
    <defs>
      <filter id="sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
    
    <rect width="100%" height="100%" fill="#ffffff" stroke="#000000" stroke-width="4" rx="0" ry="0" />
    
    <!-- Rough Grid Background -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" stroke-width="1"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Sketchy decorative elements -->
    <circle cx="${svgWidth * 0.2}" cy="${svgHeight * 0.8}" r="${Math.min(svgWidth, svgHeight) * 0.25}" fill="none" stroke="#000" stroke-width="2" stroke-dasharray="10 5" filter="url(#sketch)" opacity="0.1"/>
    <circle cx="${svgWidth * 0.85}" cy="${svgHeight * 0.25}" r="${Math.min(svgWidth, svgHeight) * 0.35}" fill="none" stroke="#000" stroke-width="2" stroke-dasharray="10 5" filter="url(#sketch)" opacity="0.1"/>
    <circle cx="${svgWidth * 0.45}" cy="${svgHeight * 0.25}" r="${Math.min(svgWidth, svgHeight) * 0.85}" fill="none" stroke="#000" stroke-width="2" stroke-dasharray="10 5" filter="url(#sketch)" opacity="0.2"/>
    
    <!-- Scribbles -->
    <path d="M${svgWidth * 0.8} ${svgHeight * 0.8} Q${svgWidth * 0.9} ${svgHeight * 0.7} ${svgWidth * 0.95} ${svgHeight * 0.9}" stroke="#000" stroke-width="1" fill="none" filter="url(#sketch)" opacity="0.1" />
  ` : `
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