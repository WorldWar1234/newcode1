const DEFAULT_QUALITY = 40;
const axios = require('axios');
const sharp = require('sharp');

function params(req, res, next) {
  const { url, jpeg, bw, l } = req.query;

  if (!url) {
    return res.end('bandwidth-hero-proxy');
  }

  axios.head(url)
    .then(response => {
      const headers = response.headers;
      const size = parseInt(headers['content-length'], 10);
      const type = headers['content-type'];

      sharp(url)
        .metadata()
        .then(metadata => {
          req.params.url = url;
          req.params.originType = type.split('/')[1];
          req.params.originSize = size;
          req.params.webp = !jpeg;
          req.params.grayscale = bw !== '0';
          req.params.quality = parseInt(l, 10) || DEFAULT_QUALITY;

          next();
        })
        .catch(error => {
          console.error('Error fetching image metadata:', error);
          res.status(500).send('Error fetching image metadata');
        });
    })
    .catch(error => {
      console.error('Error fetching image headers:', error);
      res.status(500).send('Error fetching image headers');
    });
}

module.exports = params;
