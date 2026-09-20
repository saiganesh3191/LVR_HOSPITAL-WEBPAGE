import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3001);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const relative = normalize(pathname.replace(/^\/+/, ""));
  if (relative === ".." || relative.startsWith(`..${sep}`)) {
    response.writeHead(400).end();
    return;
  }
  const candidate = join(root, relative || "index.html");
  const paths = extname(candidate) ? [candidate] : [candidate, `${candidate}.html`, join(candidate, "index.html")];
  let file;
  for (const path of paths) {
    try { if ((await stat(path)).isFile()) { file = path; break; } } catch { /* Try the next static path. */ }
  }
  const status = file ? 200 : 404;
  const path = file || join(root, "404.html");
  try {
    const body = await readFile(path);
    response.writeHead(status, { "Content-Type": mime[extname(path)] || "application/octet-stream" });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch { response.writeHead(404).end(); }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}`));
