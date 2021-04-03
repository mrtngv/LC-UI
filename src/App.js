import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(previousState => ({
      buttonClicked: previousState.buttonClicked + 1
    }))
  }

  render() {
    return (
      <div>
        <h1>Az sum zaglavie new</h1>
        <span>
          <label>Click me</label><br />
          <button onClick={this.handleClick}>I am a button</button>
        </span>
        <h2>{"Clicked: " + this.state.buttonClicked}</h2>
      </div>
    )
  }
}

export default App;