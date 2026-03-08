const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadToImageKit(buffer, fileName, folderPath = "The_Remix_world/audio") {

  try {

    const response = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: fileName,
      folderPath: folderPath
    });

    return response;

  } catch (error) {

    console.error("ImageKit Upload Error:", error);
    throw error;

  }

}

module.exports = uploadToImageKit;