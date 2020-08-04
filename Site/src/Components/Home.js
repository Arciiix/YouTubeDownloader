import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import "../Styles/Home.css";

const dialog = window.require("electron").remote.dialog;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      extension: "mp3",
      error: false,
    };
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
      this.props.title.bind(this.props.that, response.title)();
      this.props.path.bind(this.props.that, response.path)();
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

  render() {
    return (
      <div className="container">
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
