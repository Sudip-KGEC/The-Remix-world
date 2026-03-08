const { ImageKit } = require("@imagekit/nodejs");

let imagekit = null;

if (process.env.NODE_ENV !== "test") {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  });
}

/**
 * Upload file to ImageKit
 * @param {Buffer} buffer
 * @param {String} fileName
 * @param {String} type (songs | videos | frac)
 * @param {String} artistName
 */

async function uploadToImageKit(buffer, fileName, type, artistName) {

  if (process.env.NODE_ENV === "test") {
    return {
      url: "https://fake-imagekit-url/test-file",
      fileId: "test123"
    };
  }

  try {

    const folderPath = `The_Remix_world/${type}/${artistName}`;

    const response = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: fileName,
      folder: folderPath
    });

    return response;

  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    throw error;
  }
}

module.exports = uploadToImageKit;