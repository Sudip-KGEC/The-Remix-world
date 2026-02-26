
const Song = require("../models/Song");
const User = require("../models/User")


//Admin upload song
exports.uploadSong = async (req, res) => {
    try {
      const song = await Song.create({
        title: req.body.title,
        adminId: req.user.id,
        filePath: req.file.path
      });

      res.json({
        message: "Song uploaded. Waiting for approval.",
        song
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


// Super Admin approved 
exports.approvedSong = async (req, res) => {
      const song = await Song.findById(req.params.id);
  
      song.isApproved = true;
      await song.save();
  
      res.json({ message: "Song approved" });
    }

// Streaming Song User 
 exports.streamingSong = async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);

      if (!song.isApproved)
        return res.status(403).json({ message: "Song not approved" });

      const user = await User.findById(req.user.id);

      if (user.credits < 1)
        return res.status(400).json({ message: "Not enough credits" });

      user.credits -= 1;
      await user.save();

      song.playCount += 1;
      await song.save();

      res.json({
        message: "Streaming allowed",
        filePath: song.filePath,
        remainingCredits: user.credits
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }