const http = require('http');
const url = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    // Check if the request is for a file in the public folder
    if (pathname.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, 'public', pathname);

      // Serve the file if it exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.createReadStream(filePath).pipe(res);
        } else {
          // If file doesn't exist, handle as a 404 error
          res.statusCode = 404;
          res.end('File not found');
        }
      });
    } else {
      // Handle requests with Next.js
      handle(req, res, parsedUrl);
    }
  }).listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    );
  });
});
