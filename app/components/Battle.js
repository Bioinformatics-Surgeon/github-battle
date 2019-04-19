const React = require('react');

class Battle extends React.Component {
  constructor() {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImg: null,
      playerTwoImg: null
    };

    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleSumbit(id, username) {
    this.setState(function() {
      let newState = {};
      newState[id + 'Name'] = username;
    });
  }
  render() {
    return <div />;
  }
}

module.exports = Battle;

// React is controlling the state of the app with forms, this is often called a controlled component
// Encaplsulation - parent doesn't care about the current input it only cares about the end or final result
// the child will pass username to the parent with an onSubmit handleler.
