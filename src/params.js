const DEFAULT_QUALITY = 40;
const sharp = require('sharp');

function params(req, res, next) {
  const { url, jpeg, bw, l } = req.query;

  if (!url) {
    return res.end('bandwidth-hero-proxy');
  }

  const urls = Array.isArray(url) ? url.join('&url=') : url;
  const cleanedUrl = urls.replace(/http:\/\/1\.1\.\d\.\d\/bmi\/(https?:\/\/)?/i, 'http://');

  sharp(req.query.url)
    .metadata()
    .then(metadata => {
      req.params.url = req.query.url;
      req.params.originType = metadata.format;
      req.params.originSize = metadata.size;
      req.params.webp = !jpeg;
      req.params.grayscale = bw !== '0';
      req.params.quality = parseInt(l, 10) || DEFAULT_QUALITY;

      next();
    })
    .catch(error => {
      console.error('Error fetching image:', error);
      res.status(500).send('Error fetching image');
    });
}

module.exports = params;
