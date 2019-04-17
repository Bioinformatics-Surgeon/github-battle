const axios = require('axios');
// all the api request in the app

module.exports = {
  // get all repos with more than one Star, in a particular Language, sort by Stars, order in decending order, type must be a repository
  fetchPopularRepos: function(language) {
    let encodedURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language +
        '&sort=stars&order=desc&type=Repositories'
    );

    return axios.get(encodedURI).then(function(response) {
      return response.data.items;
    });
  }
};
