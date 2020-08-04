# YouTube Downloader

## A simple app which can download videos from YouTube built with Electron and React

- Can download videos for now in two extensions - MP3 and MP4
- All runs only on your computer - the server is included in the app

### Warning

For now, the app has a lot of bugs, so you can report them to me or create a pull request.

### About the app

The app requires **[Node.js](https://nodejs.org/)** and [**ffmpeg**](https://ffmpeg.org/), and is currently only for windows. It also uses [**youtube-dl**](https://www.npmjs.com/package/youtube-dl).

## How to run/build it on your computer?

You'd need Electron and React installed on it additionally.

1. Build the React App
   `cd Site`
   `npm run build`
2. Replace the paths in index.html to the relative ones (replace every / to ./ (_for e.g. change /chunk-xxxxxxx.js to ./chunk-xxxxxxx.js_)
3. Build the electron app, use [electron-packager](https://www.npmjs.com/package/electron-packager) for example.
