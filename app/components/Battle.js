const React = require('react');
const PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  handleChange(event) {
    let value = event.target.value;

    this.setState(function() {
      return {
        username: value
      };
    });
  }
  render() {
    return (
      <form className='column'>
        <label htmlFor='username' className='header'>
          {this.props.label}
        </label>
        <input
          type='text'
          id='username'
          placeholder='github username'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

PlayerInput.proptypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

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
      newState[id + 'Image'] =
        'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }
  render() {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;

    return (
      <div>
        <div className='row'>
          {!playerOneName && (
            <PlayInput
              id='playerOne'
              label='Player One'
              onDumbit={this.handleSumbit}
            />
          )}
          {!playerTwoName && (
            <PlayInput
              id='playerTwo'
              label='Player Two'
              onSumbit={this.handleSumbit}
            />
          )}
        </div>
      </div>
    );
  }
}

module.exports = Battle;

// React is controlling the state of the app with forms, this is often called a controlled component
// Encaplsulation - parent doesn't care about the current input it only cares about the end or final result
// the child will pass username to the parent with an onSubmit handleler.
// A controlled component: binds the value of the input field to what the property on the state object is or what the state value id
// React is controlling the value of the specifif input field
// Uncontrolled it will grab it from the DOM
// pass child a func and recieve state and will then update the parent state
// {!playerOneName &&
// <PlayInput />}
// - says if playerOneName is truthy then render <PlayerInput />
// If a componet is not re-useable then keep it in it's asociated file
