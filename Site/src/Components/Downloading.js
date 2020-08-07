import React from "react";
import { LinearProgress, Badge } from "@material-ui/core";
import { IoMdArrowRoundBack, IoMdCloudDownload } from "react-icons/io/";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";

import "../Styles/Downloading.css";

const ipcRenderer = window.require("electron").ipcRenderer;

class Downloading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousAlertTitle: "",
    };
    this.interval = null;
    this.socket = io(this.props.ip);
  }

  goBack() {
    this.props.changePage.bind(this.props.that, 0)();
  }

  render() {
    return (
      <div className="container">
        <div className="badge">
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
        <div className="icon" onClick={this.goBack.bind(this)}>
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
