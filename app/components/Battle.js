const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img src={props.avatar} alt={'Avatar for' + props.username} />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button className='reset' onClick={props.onReset.bind(null, props.id)} />
    </div>
  );
}

PlayerPreview.proptypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

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
  // we want the button to be disabled if this.state.username is not a thing. If there is no username in the buttons input field then we don't want the button to work
  render() {
    return (
      <form className='column' onSubmit={this.handleSumbit}>
        <label className='header' htmlFor='username'>
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

// the proptypes that are being passed from Battle are the following 3 props

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
    this.handleReset = this.handleReset.bind(this);
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

  handleReset(id) {
    this.setState(function() {
      let newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render() {
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    // if this is truthy then do this {!whatever && (<Component/>)}
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
          {playerOneImage !== null && (
            <PlayerPreview
              id='playerOne'
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
            />
          )}
          {!playerTwoName && (
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSumbit}
            />
          )}
          {playerTwoImage !== null && (
            <PlayerPreview
              id='playerTwo'
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
            />
          )}
        </div>
      {playerOneImage && playerTwoImage && 
        <Link
          className='button'
          to={}>
          Battle
        </Link>}
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
// If playerOne is a thing don't show anything else show the <PlayerInput /> component

// If a component is not re-useable then keep it in it's associated file
// The PlayerInput component is unique to this component so we will keep it within this file

/*
Breakdown of the state management of the Battle component:
- Inside of the Battle component lives 2 smaller PlayerInput components 
- State for the parent Battle component is:
    playerOneImage: null
    playerOneName: ""
    playerTwoImage: null
    playerTwoName: ""

- State for the child components PlayerInput is:
    username: ""

With Forms: 
  typically the users will type something in the input field and submit it; then they will go grab it form the DOM

* Controlled component *
  - Instead of going and grabbing hte value form teh DOM we bind the value of the input field to whatever the property of the state object
  - we bind the input value to whatever the state value is, so whenever you update the state the input field will change
  - React is control the specific value of the input field
  - React doc recommends this way

* Uncontrolled component *
  - instead of binding the input value to the state we will get the value from the DOM after submit

example: when user types into the input field it updates the state which then updates the value of that input field

- to handle the encapsulation we are passing a onSubmit function down to the child component
  - then when the button for the on submit is click we will then pass the function that is passed down the value of the state of the child to the onSubmit function form the parent; which will update the parents state

* the way to update a parents state from an encapsulated child is to pass that child a function that will handle that will accept the childs value and update the parents state
*/
