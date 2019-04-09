const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');

class Users extends React.Component {
  render() {
    // this is Javascript land

    let friends = this.props.list.filter(user => {
      return user.friend === true;
    });
    let nonFriends = this.props.list.filter(user => {
      return user.friend === false;
    });

    return (
      <div>
        <h1>Friends</h1>
        <ul>
          {/*Create an <> for every name in the list array who is also your friend*/}
          {nonFriends.map(function(user, index) {
            return <li key={index}>{user.name}</li>;
          })}
        </ul>

        <hr />

        <h1> Non Friends </h1>
        <ul>
          {friends.map((user, index) => {
            return <li key={index}> {user.name} </li>;
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Users
    list={[
      { name: 'Tyler', friend: true },
      { name: 'Ryan', friend: true },
      { name: 'Michael', friend: false },
      { name: 'Mikenzi', friend: false },
      { name: 'Jessica', friend: true },
      { name: 'Dan', friend: false }
    ]}
  />,
  document.getElementById('app')
);
