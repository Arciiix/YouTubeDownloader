import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Badge,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloudDownload } from "react-icons/io";
import io from "socket.io-client";

import "../Styles/Home.css";

const dialog = window.require("electron").remote.dialog;
const ipcRenderer = window.require("electron").ipcRenderer;

let lastAlertDate;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      extension: "mp3",
      error: false,
    };

    this.socket = io(this.props.ip);
  }

  componentDidMount() {
    this.socket.on("downloaded", (data) => {
      this.makeAToast(data.title);
      //Update the current amount of queue
      this.props.updateCurrentlyDownloading.bind(this.props.that, data.left)();
      //If the download queue is done, move to the done page
      if (data.isDone) {
        ipcRenderer.send("downloaded");
        this.props.changePage.bind(this.props.that, 2)();
      }
    });
  }

  makeAToast(title) {
    if (lastAlertDate + 2500 > new Date().getTime()) return;
    toast.info("☑️ Pobrano " + title, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    lastAlertDate = new Date().getTime();
  }

  async download() {
    if (this.state.url === "") {
      this.setState({ error: true });
      return;
    }

    let isPathSelected = await this.selectPath();
    if (!isPathSelected) return;

    let request = await fetch(
      `${this.props.ip}/download?url=${this.state.url}&extension=${this.state.extension}`
    );
    if (request.status === 200) {
      let response = await request.json();
      this.props.updatePath.bind(this.props.that, response.path)();

      //Update the queue length on the site
      this.props.updateCurrentlyDownloading.bind(
        this.props.that,
        this.props.currentlyDownloading + 1
      )();

      //Make the progress bar on the icon
      ipcRenderer.send("downloading");

      this.props.changePage.bind(this.props.that, 1)();
    } else {
      this.setState({ error: true });
    }
  }

  async selectPath() {
    let select = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });
    if (select == undefined) {
      return false;
    } else {
      await fetch(`${this.props.ip}/setDirectory?directory=${select[0]}`);
      return true;
    }
  }

  goToDownloadingPage() {
    if (this.props.currentlyDownloading > 0) {
      this.props.changePage.bind(this.props.that, 1)();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="badge" onClick={this.goToDownloadingPage.bind(this)}>
          <Badge
            badgeContent={this.props.currentlyDownloading}
            showZero
            color="primary"
          >
            <IoMdCloudDownload />
          </Badge>
        </div>
        <ToastContainer
          className="toastContainer"
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="inputs">
          <div className="url">
            <TextField
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              label="Link"
              fullWidth
              variant="filled"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
              value={this.state.url}
              onChange={(e) => {
                this.setState({ url: e.target.value });
              }}
              error={this.state.error}
            />
          </div>
          <div className="extension">
            <FormControl fullWidth variant="filled">
              <InputLabel>Format</InputLabel>
              <Select
                fullWidth
                label="Format"
                variant="filled"
                SelectDisplayProps={{
                  style: {
                    backgroundColor: "white",
                    borderRadius: "5px",
                  },
                }}
                value={this.state.extension}
                onChange={(e) => {
                  this.setState({ extension: e.target.value });
                }}
              >
                <MenuItem value={"mp3"}>MP3</MenuItem>
                <MenuItem value={"mp4"}>MP4</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="submit">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.download.bind(this)}
          >
            Pobierz
          </Button>
        </div>
      </div>
    );
  }
}
export default Home;
