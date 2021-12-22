const core = require('@actions/core');
const github = require('@actions/github');

const axios = require('axios');

const { context } = require('@actions/github')
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);
  
const { pull_request } = context.payload;
  
async function run() {
    randomPos=Math.floor(Math.random() * 1000)
    const url=`https://g.tenor.com/v1/search?q=thank+you+leonardo+dicaprio&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`
    
    axios.get(url).then(function (response) { 
        console.log(response)
    }).catch(function (error) { 
        console.loog(error)
    })


    resp = await myfetch(url)
    const respJson = resp.json()
    console.log(respJson)

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: 'Thank you for submitting a pull request! We will try to review this as soon as we can.'
  });
}
  
run();