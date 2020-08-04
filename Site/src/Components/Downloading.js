import React from "react";
import { LinearProgress } from "@material-ui/core";
import { IoMdArrowRoundBack } from "react-icons/io/";

import "../Styles/Downloading.css";

const ipcRenderer = window.require("electron").ipcRenderer;

class Downloading extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    ipcRenderer.send("downloading");
    this.interval = setInterval(async () => {
      await this.checkForStatus();
    }, 1000);
  }

  async checkForStatus() {
    let request = await fetch(`${this.props.ip}/isDone`);
    if ((await request.text()) == "true") {
      clearInterval(this.interval);
      ipcRenderer.send("downloaded");
      this.props.changePage.bind(this.props.that, 2)();
    }
  }

  back() {
    //TODO - stop downloading the file
    this.props.changePage.bind(this.props.that, 0)();
  }

  render() {
    return (
      <div className="container">
        <div className="icon" onClick={this.back.bind(this)}>
          <IoMdArrowRoundBack />
        </div>
        <div className="progress">
          <LinearProgress variant="indeterminate" />
        </div>
      </div>
    );
  }
}
export default Downloading;
