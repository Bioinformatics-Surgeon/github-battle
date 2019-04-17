const React = require('react');
const Link = require('react-router-dom');

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Battle your fiends!</h1>
        <Link className='button' to='/battle' />
      </div>
    );
  }
}

module.exports = Home;
