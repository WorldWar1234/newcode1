const sharp = require('sharp');

const compress = (req, res) => {
  if (!shouldCompress(req)) {
    return res.redirect(req.params.url); // Redirect to original image if no compression needed
  }

  sharp(req.params.url)
    .grayscale(req.params.grayscale)
    .toFormat(req.params.webp ? 'webp' : 'jpeg', {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    })
    .toBuffer((err, output, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error'); // Send 500 error response
      }

      res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
      res.setHeader('content-length', info.size);
      res.status(200).send(output);
    });
};

module.exports = compress;
