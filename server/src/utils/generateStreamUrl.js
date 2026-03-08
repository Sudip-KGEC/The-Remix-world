
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

function generateStreamUrl(fileUrl) {

  const expireSeconds = 360; // 5 minutes

  const signedUrl = imagekit.url({
    src: fileUrl,
    signed: true,
    expireSeconds: expireSeconds
  });

  return signedUrl;
}

module.exports = generateStreamUrl;