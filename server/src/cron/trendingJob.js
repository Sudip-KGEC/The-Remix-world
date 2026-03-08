const cron = require("node-cron");
const Song = require("../models/Song");

cron.schedule("0 * * * *", async () => {

  const songs = await Song.find();

  for (let song of songs) {

    const score =
      (song.playCount * 0.4) +
      (song.likeCount * 0.2) +
      (song.commentCount * 0.2) +
      (song.shareCount * 0.2);

    song.trendingScore = score;

    await song.save();
  }

});