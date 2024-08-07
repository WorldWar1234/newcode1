const sharp = require('sharp');

const compress = (req, res) => {
  if (!shouldCompress(req)) {
    return res.status(200).send('Image does not need compression');
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
        return res.status(500).send('Error compressing image');
      }

      res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
      res.setHeader('content-length', info.size);
      res.status(200).send(output);
    });
};

module.exports = compress;
