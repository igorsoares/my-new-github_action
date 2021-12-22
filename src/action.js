const core = require('@actions/core');
const github = require('@actions/github');

const axios = require('axios');

const { context } = require('@actions/github')
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);
url_media = undefined    
const { pull_request } = context.payload;
  
async function run() {
    randomPos=Math.floor(Math.random() * 10)
    search_item="leonardo dicaprio thank you"
    const url = `https://g.tenor.com/v1/search?q=${search_item.split(" ").join("+")}&pos=${randomPos}&limit=1&media_filter=tinygif&contentfilter=high&key=${TENOR_TOKEN}`
    console.log(url)
    
    msg='Obrigado pelo feedback. Avaliaremos assim que possível.'
    await axios.get(url).then(function (response) { 
        var x = response.data.results
        url_media = x[0].media[0].tinygif.url
        console.log("URL_MEDIA :" + url_media)
        
    }).catch(function (error) { 
        console.log(error)
    })

    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: `${msg}\n\n<img src="${url_media}" alt="${search_item}">`
    });
   
  
}
  
run();