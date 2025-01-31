import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for cloudinary uplaods
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uplaodToCloduinary", error);
    throw new Error("Error Uplaoding to Cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || req.files.imageFile) {
      return res.status(400).json({ message: "Please uplaod all files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    //if song belongs to an album, update the albums songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(2001).json(song);
  } catch (error) {
    console.log("error in CreateSong", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const id = req.params;

    const song = await song.findById(id);

    //if  song belongs to an album,update the albums songs array
    if (song.albumId) {
      await Album.findByIdAndDelete(id);
      res.status(200).json({ message: "Song Deleted Successfully" });
    }
  } catch (error) {
    console.log("Error in DeleteSong", error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in CreateAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "album deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
 