if (process.argv[2] === undefined) {
  console.log("Please enter the repo owner");
  return;
} else if (process.argv[3] === undefined) {
  console.log("Please enter the repo name");
  return;
}

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "AmirGhan";
var GITHUB_TOKEN = "5936d38b4959dd31248f9e787cb74af98b535be0";

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'request'
  }
  };
  
  request(options, function(err, response, body){
    if (err) throw err;

    var listOfContributers = JSON.parse(body);

    cb(err, listOfContributers);

  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(error) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));

};


getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  result.forEach(function(element){
    var avatarURL = element["avatar_url"];
    var fileName = element["login"];
    var filePath = "./avatars/" + fileName + ".jpg";
   downloadImageByURL(avatarURL, filePath);
  });

});

