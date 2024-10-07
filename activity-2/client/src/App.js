import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GoodThings</h1>
          <p>{this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App;