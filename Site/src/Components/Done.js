import React from "react";
import { Button } from "@material-ui/core";

import "../Styles/Done.css";

const ipcRenderer = window.require("electron").ipcRenderer;

class Done extends React.Component {
  componentDidMount() {
    ipcRenderer.send("downloaded");
  }
  back() {
    this.props.changePage.bind(this.props.that, 0)();
  }
  render() {
    return (
      <div className="container">
        <div className="success">
          <div className="alert">
            <span className="alertHeader">Gotowe!</span>
            <span className="alertBody">{this.props.path}</span>
          </div>
          <div className="btn">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.back.bind(this)}
            >
              Jeszcze raz
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Done;
