const core = require('@actions/core');
const github = require('@actions/github');

const axios = require('axios');

const { context } = require('@actions/github')
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);
  
const { pull_request } = context.payload;
  
async function run() {
    randomPos=Math.floor(Math.random() * 10)
    const url=`https://g.tenor.com/v1/search?q=thank+you+leonardo+dicaprio&pos=${randomPos}&limit=1&media_filter=tinygif&contentfilter=high&key=${TENOR_TOKEN}`
    url_media = undefined    
    msg='Obrigado pelo feedback. Avaliaremos assim que possível.'
    axios.get(url).then(function (response) { 
        var x = response.data.results
        url_media=x[0].media[0].tinygif.url
    }).catch(function (error) { 
        console.log(error)
    })

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `${msg}<img src="${url_media}"`
  });
}
  
run();