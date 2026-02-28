export function parseWikilinks(content) {
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const linkText = match[1].trim();
    const displayText = match[2] ? match[2].trim() : null;
    
    links.push({
      original: match[0],
      slug: linkText.toLowerCase().replace(/\s+/g, '-'),
      display: displayText || linkText
    });
  }
  
  return links;
}

export function getGraphData(articles) {
  const nodes = articles.map(article => ({
    id: article.slug,
    title: article.title,
    tags: article.tags || [],
    linkCount: 0
  }));
  
  const links = [];
  const slugToTitle = {};
  
  articles.forEach(article => {
    slugToTitle[article.slug] = article.title;
  });
  
  articles.forEach(article => {
    const wikilinks = parseWikilinks(article.content);
    const articleTags = article.tags || [];
    
    wikilinks.forEach(wikilink => {
      if (nodes.find(n => n.id === wikilink.slug)) {
        links.push({
          source: article.slug,
          target: wikilink.slug,
          type: 'wikilink'
        });
        const targetNode = nodes.find(n => n.id === wikilink.slug);
        if (targetNode) targetNode.linkCount++;
      }
    });
    
    articleTags.forEach(tag => {
      articles.forEach(otherArticle => {
        if (otherArticle.slug !== article.slug) {
          const otherTags = otherArticle.tags || [];
          if (otherTags.includes(tag) && !links.find(l => 
            (l.source === article.slug && l.target === otherArticle.slug) ||
            (l.source === otherArticle.slug && l.target === article.slug)
          )) {
            links.push({
              source: article.slug,
              target: otherArticle.slug,
              type: 'tag'
            });
            const targetNode = nodes.find(n => n.id === otherArticle.slug);
            if (targetNode) targetNode.linkCount++;
          }
        }
      });
    });
  });
  
  nodes.forEach(node => {
    const incomingLinks = links.filter(l => l.target === node.id).length;
    const outgoingLinks = links.filter(l => l.source === node.id).length;
    node.linkCount = incomingLinks + outgoingLinks;
  });
  
  return { nodes, links };
}

export function getBacklinks(articles, slug) {
  const backlinks = [];
  const targetArticle = articles.find(a => a.slug === slug);
  
  if (!targetArticle) return backlinks;
  
  const targetTags = targetArticle.tags || [];
  
  articles.forEach(article => {
    if (article.slug === slug) return;
    
    const wikilinks = parseWikilinks(article.content);
    const hasWikilink = wikilinks.some(w => w.slug === slug);
    const sharedTags = targetTags.filter(tag => (article.tags || []).includes(tag));
    
    if (hasWikilink || sharedTags.length > 0) {
      backlinks.push({
        slug: article.slug,
        title: article.title,
        viaWikilink: hasWikilink,
        sharedTags: sharedTags
      });
    }
  });
  
  return backlinks;
}
