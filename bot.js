var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
// https://i.groupme.com/722x1090.jpeg.6d94d02693164d2cba17da4cab19f421.large
//
function respond() 
{
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/jake/;

  if(request.text && botRegex.test(request.text))
  {
    this.res.writeHead(200);
    postMessage("http://i.imgur.com/4Ae1GPz.jpg");
    postMessage("Fuck the Indians");
    this.res.end();
  } 
  else 
  {
    this.res.writeHead(200);
    postmessage("CUBS");
    this.res.end();
  }
}

function postMessage(response) 
{
  var botResponse,options, body, botReq;

  botResponse = response

  options = 
  {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = 
  {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) 
  {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err)
  {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) 
{
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
