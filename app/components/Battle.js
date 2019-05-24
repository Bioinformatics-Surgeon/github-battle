const React = require('react');
const PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;

    this.setState(function() {
      return {
        username: value
      };
    });
  }

  handleSumbit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSumbit}>
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
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
        >
          Submit
        </button>
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
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleSumbit(id, username) {
    // we want the this key word in this function to always reference this instance(the component) no matter where this function is called it will always refer to this instance
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
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSumbit}
            />
          )}
          {!playerTwoName && (
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSumbit}
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
// React is controlling the value of the specific input field
// Uncontrolled it will grab it from the DOM
// pass child a func and recieve state and will then update the parent state

// {!playerOneName &&
// <PlayInput />}
// - says if playerOneName is truthy then render <PlayerInput />
// If a component is not re-useable then keep it in it's associated file
// If playerOne is a thing don't show anything else show the <PlayerInput /> component
