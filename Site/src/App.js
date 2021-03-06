import React from "react";

import Home from "./Components/Home";
import Downloading from "./Components/Downloading";
import Done from "./Components/Done";

const serverIp = "http://localhost:34243";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 0,
      currentlyDownloading: 0,
      path: "",
    };
  }
  render() {
    switch (this.state.currPage) {
      case 0:
        return (
          <Home
            that={this}
            changePage={this.changePage}
            ip={serverIp}
            currentlyDownloading={this.state.currentlyDownloading}
            updatePath={(path) => {
              this.setState({ path: path });
            }}
            updateCurrentlyDownloading={(currentlyDownloading) => {
              this.setState({ currentlyDownloading: currentlyDownloading });
            }}
          />
        );
      case 1:
        return (
          <Downloading
            that={this}
            changePage={this.changePage}
            ip={serverIp}
            currentlyDownloading={this.state.currentlyDownloading}
            updateCurrentlyDownloading={(currentlyDownloading) => {
              this.setState({ currentlyDownloading: currentlyDownloading });
            }}
          />
        );
      case 2:
        return (
          <Done
            that={this}
            changePage={this.changePage}
            fileName={this.state.fileName}
            path={this.state.path}
            ip={serverIp}
          />
        );
    }
  }

  changePage(page) {
    this.setState({ currPage: page }, this.forceUpdate);
  }
}

export default App;
