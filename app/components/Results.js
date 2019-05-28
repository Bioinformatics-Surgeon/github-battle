const React = require('react');

class Results extends React.Component {
  render() {
    return <div>Results</div>;
  }
}

module.exports = Results;

// 5-28 So with this component it will take the url that is given to us by react router and we will parse the search property on the props object passed by react router and we will make an ajax call to github for the information that is passed to the url after battle/results
