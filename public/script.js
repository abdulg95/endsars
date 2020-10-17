const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const socket = io();
let tweetArray = [];
let index = 0;

//connect socket
socket.on('connect',function(data){
    console.log('connected');
})

//on receiving of tweet populate tweet body
socket.on('tweet', function (tweet) {
    console.log(tweet.tweet);
    const tweetbody = {
    'text': tweet.tweet.text,
    'userScreenName': "@" + tweet.tweet.user.screen_name,
    'userImage': tweet.tweet.user.profile_image_url_https,
    'userDescription': tweet.tweet.user.description,
    }
    try {
    if(tweet.tweet.entities.media[0].media_url_https) {
        tweetbody['image'] = tweet.tweet.entities.media[0].media_url_https;
    }
    } catch(err) { }
    tweetArray.unshift(tweetbody);
});

  
  socket.on('allTweet', function (tweet) {
      console.log(tweet);
      tweetArray=tweet;
      loopArray();
  });
  
  //cycle through tweets
  function loopArray() {
    if(tweetArray.length > index) {   
    let currentTweet = tweetArray[index];
    index ++;
    if(currentTweet.userScreenName === ''){
        authorText.innerText = 'Unknown'
    }else{
        authorText.innerText = currentTweet.userScreenName;
    }
    //reduce font size for long quotes
    if(currentTweet.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = currentTweet.text;
    $("#user-image").attr("src",currentTweet.userImage);   
    } else {
      index = 0;
    }
    setTimeout(loopArray, 10000);
  }




function tweetQuote(){
    const hashtags = 'EndSARS,EndPoliceBrutality,EndBadGovernance';
    const twitterUrl = `https://twitter.com/intent/tweet?hashtags=${hashtags}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
twitterBtn.addEventListener('click',tweetQuote);
//on Load
getTweet();