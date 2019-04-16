const React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    // calling updateLanguage in the correct contenxt
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
  }
  render() {
    let languages = [
      'All',
      'Javascript',
      'Python',
      'C#',
      'Java',
      'Ruby',
      'CSS'
    ];
    return (
      <ul className="languagesNav">
        {this.state.selectedLanguage}
        {languages.map(function(lang) {
          return (
            <li
              style={
                lang === this.state.selectedLanguage
                  ? { color: '#d0021b' }
                  : null
              }
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}
            >
              {lang}
            </li>
          );
        }, this)}
      </ul>
    );
  }
}

module.exports = Popular;
