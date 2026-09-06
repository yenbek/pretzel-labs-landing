// Static server for dist/ with brotli/gzip and sane cache headers.
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const ROOT = path.join(__dirname, 'dist'), PORT = +process.argv[2] || 4323;
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.mp4':'video/mp4', '.woff2':'font/woff2' };
const COMPRESSIBLE = new Set(['.html','.js','.css']);
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, path.normalize(p).replace(/^(\.\.[/\\])+/, ''));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.statusCode = 404; return res.end('not found'); }
  const ext = path.extname(file), body = fs.readFileSync(file);
  res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable');
  if (ext === '.mp4') res.setHeader('Accept-Ranges', 'bytes');
  const accept = req.headers['accept-encoding'] || '';
  if (COMPRESSIBLE.has(ext) && /br/.test(accept)) { res.setHeader('Content-Encoding','br'); return res.end(zlib.brotliCompressSync(body)); }
  if (COMPRESSIBLE.has(ext) && /gzip/.test(accept)) { res.setHeader('Content-Encoding','gzip'); return res.end(zlib.gzipSync(body)); }
  res.end(body);
}).listen(PORT, () => console.log('dist server on http://localhost:' + PORT));
