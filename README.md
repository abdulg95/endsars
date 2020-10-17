# endsars
live stream tweets from end sars campaign using Twitter streaming API.

#access hosted app here
[a link](https://vast-springs-63541.herokuapp.com/)
#to build locally 

1. Clone the project 

2. <code>npm install</code>

3. open <code>index.js</code>

4. Place your twitter developer access tokens and keys here

```
  var T = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  '',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });
```

5. <code> node index.js </code>
