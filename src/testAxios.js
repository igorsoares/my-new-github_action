const axios = require('axios');

randomPos = Math.floor(Math.random() * 10)
const url=`https://g.tenor.com/v1/search?q=thank+you+leonardo+dicaprio&pos=${randomPos}&limit=1&media_filter=tinygif&contentfilter=high&key=${TENOR_TOKEN}`
    
axios.get(url).then(function (response) { 
    var x = response.data.results
    var media=x[0].media[0].tinygif.url
    console.log(media)

}).catch(function (error) { 
    console.log(error)
})
