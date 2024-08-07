const sharp = require('sharp');

const compress = (req, res) => {
  if (!shouldCompress(req)) {
    console.log('Not compressing image, redirecting to original URL');
    return res.redirect(req.params.url); // Redirect to original image if no compression needed
  }

  console.log('Compressing image...');

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
        return res.redirect(req.params.url); // Redirect to original image if error
      }

      res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
      res.setHeader('content-length', info.size);
      res.status(200).send(output);
    });
};

module.exports = compress;
