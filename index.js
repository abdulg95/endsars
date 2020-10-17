var Twit = require('twit');
const express = require('express');
const app = express();
const server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));





io.on('connection', function(socket) {

    T.get('search/tweets', { q: '#endsars', count: 100 }, function(err, data, response) {
      var tweetArray=[];
        for (let index = 0; index < data.statuses.length; index++) {
            const tweet = data.statuses[index];
            var tweetbody = {
              'text': tweet.text,
              'userScreenName': "@" + tweet.user.screen_name,
              'userImage': tweet.user.profile_image_url_https,
              'userDescription': tweet.user.description,
            }
            try {
              if(tweet.entities.media[0].media_url_https) {
                tweetbody['image'] = tweet.entities.media[0].media_url_https;
              }
            } catch(err) { }
            tweetArray.push(tweetbody);
        }     
        io.emit('allTweet',tweetArray)
    })

    var stream = T.stream('statuses/filter', { track: '#endsars', language: 'en' })

    stream.on('tweet', function (tweet) {
        io.emit('tweet',{ 'tweet': tweet });
    })
});

var T = new Twit({
  consumer_key:         'UTtQrLdvPqUvtc8CQGR5bgbT8',
  consumer_secret:      'WFPcZDVhLAXpY1DaAaMy3bGJ0FUoBT1fYixU9hB6W1H63lcx03',
  access_token:         '39557923-W698qvkHmOJzQ9PQvXUJa00it4KhgQWhOlqwrkzvZ',
  access_token_secret:  'Y3aYJC1szgES8RUoCXECtUjqEZtgIIs2nf74UjNmYHwx8',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});