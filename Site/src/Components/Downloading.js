import React from "react";
import { LinearProgress } from "@material-ui/core";
import { IoMdArrowRoundBack } from "react-icons/io/";

import "../Styles/Downloading.css";

class Downloading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 12,
    };
  }

  componentDidMount() {
    //DEV
    setTimeout(() => {
      this.onDownloadEnd();
    }, 1000);
  }

  onDownloadEnd() {
    this.props.changePage.bind(this.props.that, 2)();
  }

  back() {
    //DEV
    //Stop downloading the file
    this.props.changePage.bind(this.props.that, 0)();
  }

  render() {
    return (
      <div className="container">
        <div className="icon" onClick={this.back.bind(this)}>
          <IoMdArrowRoundBack />
        </div>
        <div className="progress">
          <span className="progressText">{this.state.progress}%</span>
          <LinearProgress variant="determinate" value={this.state.progress} />
        </div>
      </div>
    );
  }
}
export default Downloading;
