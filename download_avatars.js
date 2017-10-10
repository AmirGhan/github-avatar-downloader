var request = require('request');

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
    //console.log(response);
    console.log(body);

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});