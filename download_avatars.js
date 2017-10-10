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

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(element){
    console.log(element["avatar_url"])
   // downloadImageByURL(element["avatar_url"], )
  });

});

