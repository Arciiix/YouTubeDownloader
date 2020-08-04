const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const ytdl = require("ytdl-core");

const fs = require("fs");
const sanitize = require("sanitize-filename");
const tmp = require("tmp");
const path = require("path");

const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("./ffmpeg.exe");

const PORT = 34243;

let videoTitle = "";
let destinationPath = path.join(__dirname);
let isDone = true;

app.get("/download", async (req, res) => {
  if (!req.query.url || !req.query.extension) return res.sendStatus(400);

  //Valdate the URL
  let regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  if (!req.query.url.match(regExp)) return res.sendStatus(400);

  let videoInfo = await ytdl.getBasicInfo(req.query.url);
  videoTitle = sanitize(videoInfo.videoDetails.title);

  //If everything is good, send the title and path
  res.send(JSON.stringify({ title: videoTitle, path: destinationPath }));

  download(req.query.url, req.query.extension);
  isDone = false;
});

app.get("/setDirectory", (req, res) => {
  if (!req.query.directory) return res.sendStatus(400);
  destinationPath = path.join(req.query.directory);
  res.sendStatus(200);
});

app.get("/isDone", (req, res) => {
  res.send(isDone);
});

async function download(videoURL, extension) {
  //Download the audio and the video separately, because it has bad quality when I download it at one time

  //Create the temp files, streams and download the audio at first
  let audioFile, videoFile, audioStream, videoStream;
  audioFile = tmp.fileSync();
  audioStream = await ytdl(videoURL, {
    quality: "highestaudio",
    format: "mp3",
  });
  audioStream.pipe(fs.createWriteStream(audioFile.name + ".mp3"));

  audioStream.on("finish", async () => {
    //If user has selected mp4 format, download the video too
    if (extension == "mp4") {
      await new Promise(async (resolve, reject) => {
        videoFile = tmp.fileSync();
        videoStream = await ytdl(videoURL, {
          quality: "highestvideo",
          format: "mp4",
        });
        videoStream.pipe(fs.createWriteStream(videoFile.name + ".mp4"));
        videoStream.on("finish", () => {
          resolve();
        });
      });
      await save(audioFile.name + ".mp3", true, videoFile.name + ".mp4");
      isDone = true;
      //Clear the temp files
      fs.unlinkSync(path.join(audioFile.name));
      fs.unlinkSync(path.join(audioFile.name + ".mp3"));

      fs.unlinkSync(path.join(videoFile.name));
      fs.unlinkSync(path.join(videoFile.name + ".mp4"));
    } else {
      await save(audioFile.name + ".mp3", false);
      isDone = true;
      //Clear the temp files
      fs.unlinkSync(path.join(audioFile.name));
      fs.unlinkSync(path.join(audioFile.name + ".mp3"));
    }
  });
}

function save(file1path, isVideo, file2path) {
  return new Promise((resolve, reject) => {
    if (isVideo) {
      let stream = new ffmpeg(file2path);
      stream.addInput(file1path);
      stream.saveToFile(destinationPath + "/" + videoTitle + ".mp4");
      stream.on("end", () => {
        resolve();
      });
    } else {
      let stream = new ffmpeg(file1path);
      stream.saveToFile(destinationPath + "/" + videoTitle + ".mp3");
      stream.on("end", () => {
        resolve();
      });
    }
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
