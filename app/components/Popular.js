const React = require('react');
const api = require('../utils/api');
const PropTypes = require('prop-types');

function SelectedLanguage(props) {
  let languages = ['All', 'Javascript', 'Python', 'C#', 'Java', 'Ruby', 'CSS'];
  return (
    <ul className="languagesNav">
      {languages.map(function(lang) {
        return (
          <li
            style={
              lang === props.selectedLanguage ? { color: '#d0021b' } : null
            }
            onClick={props.onSelect.bind(null, lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    // calling updateLanguage in the correct contenxt
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
    api.fetchPopularRepos(lang).then(
      function(repos) {
        this.setState(function(repos) {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}

module.exports = Popular;
