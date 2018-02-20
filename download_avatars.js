var request = require('request');
var fs = require('fs');
var secret = require('./secrets');

console.log('Welcome to the GitHub - Avatar Downloader')

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'stewartpressney',
            'Authorization': 'token ' + secret.GITHUB_TOKEN
        }
    };

    request(options, function(err, res, body) {
        if (err) {
            throw err;
        }
        var parsedJSON = JSON.parse(body)
        cb(err, res, body);
    });
}


var AvatarURL = [];

function downloadImageByURL(url, filepath) {
    request.get(url, function(err, res, body) {
            if (err) {
                throw err;
            }
            console.log('Downloading...' + url);
        })
        .pipe(fs.createWriteStream(filepath));
}

var callback = function(err, res, body) {
    if (process.argv[2] !== repoOwner) {
        console.log('Please Provide a Repo Owner')
    } if (process.argv[3] !== repoName) {
        console.log('Please Provide a Repo Name')
    } if (!err && res.statusCode == 200) {
        var filepath
        var data = JSON.parse(body)
        for (let result of data) {
            filepath = './avatars' + result['login'] + '.png'
            downloadImageByURL(result['avatar_url'], filepath)
        }
    } else {
        console.log('ya dun fucked it good')
        //throw err;
    }
}

var repoOwner = process.argv[2]


var repoName = process.argv[3]




getRepoContributors(repoOwner, repoName, callback)