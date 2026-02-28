import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '..', 'content');
const outputDir = path.join(__dirname, '..', 'src', 'data');
const outputFile = path.join(outputDir, 'articles.json');

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseWikilinks(content) {
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const linkText = match[1].trim();
    links.push(linkText.toLowerCase().replace(/\s+/g, '-'));
  }
  
  return [...new Set(links)];
}

async function processMarkdown(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .use(rehypeHighlight)
    .process(content);
  
  const slug = path.basename(filePath, '.md');
  const dateObj = new Date(data.date);
  
  return {
    slug,
    ...data,
    year: dateObj.getFullYear().toString(),
    monthDay: `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}`,
    content: processedContent.toString(),
    outgoingLinks: parseWikilinks(content),
    filename: path.basename(filePath)
  };
}

async function build() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(contentDir, f));
  
  const articles = await Promise.all(files.map(processMarkdown));
  
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
  
  console.log(`[build:content] Generated ${articles.length} articles`);
  console.log(`[build:content] Output: ${outputFile}`);
}

build();
