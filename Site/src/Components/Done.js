import React from "react";
import { Button } from "@material-ui/core";

import "../Styles/Done.css";

class Done extends React.Component {
  back() {
    this.props.changePage.bind(this.props.that, 0)();
  }
  render() {
    return (
      <div className="container">
        <div className="success">
          <div className="alert">
            <span className="alertHeader">Gotowe!</span>
            <span className="alertBody">
              Pobrano plik {this.props.fileName}
            </span>
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
