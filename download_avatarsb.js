var request = require('request');
var fs = require('fs');
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


var AvatarURL = [];
getRepoContributors("jquery", "jquery", function(results) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
    for(result of results){
    console.log(result['avatar_url'])
    }
});



function downloadImageByURL(url, filepath) {
    request.get(url, function(err, res, body){
        if(err) {
            throw err;
        }
        console.log("Downloading..." + url);
    })
    .pipe(fs.createWriteStream(filepath));
}

if(process.argv.length !== 4){
    throw new Error("You did not provide the correct number of parameters!\nPlease input the user followed by the repo only!");
}

var callback = function (error, response, body) {
    if (!error && response.statusCode == 200) {
        mkdirp('./avatars', function (err) {
            console.log("Directory created");
        });
        var filepath;
        var info = JSON.parse(body);
        for (let element of info) {
            filepath = "./avatars/" + element["login"] + '.png';
            downloadImageByURL(element["avatar_url"], filepath)
        }
    } else {
        console.log("Something went wrong with your request....please double check the github user ID and repo")
        throw err;
    }
}

getRepoContributors(process.argv[2], process.argv[3], callback);