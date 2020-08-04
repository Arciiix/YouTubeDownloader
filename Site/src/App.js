import React from "react";

import Home from "./Components/Home";
import Downloading from "./Components/Downloading";
import Done from "./Components/Done";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 0,
      fileName: "test.mp3",
    };
  }
  render() {
    switch (this.state.currPage) {
      case 0:
        return <Home that={this} changePage={this.changePage} />;
      case 1:
        return <Downloading that={this} changePage={this.changePage} />;
      case 2:
        return (
          <Done
            that={this}
            changePage={this.changePage}
            fileName={this.state.fileName}
          />
        );
    }
  }

  changePage(page) {
    this.setState({ currPage: page }, this.forceUpdate);
  }
}

export default App;
