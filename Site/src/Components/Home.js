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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      extension: "mp3",
    };
  }

  download() {
    //DEV
    this.props.changePage.bind(this.props.that, 1)();
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
              onChange={(e, value) => {
                this.setState({ url: value });
              }}
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
