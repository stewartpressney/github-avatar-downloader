var request = require('request');

var secret = require('./secrets');

console.log('Welcome to the GitHub - Avatar Downloader')

function getRepoContributors (repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'stewartpressney',
      'Authorization' : 'token '+secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body){
    if (err) {
      throw err;
    }
    console.error(res);
    var parsedJSON = JSON.parse(body)
    cb(parsedJSON);
  });
}

getRepoContributors("jquery", "jquery", function(results) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
    for(result of results){
      console.log(result['avatar_url'])
    }

});