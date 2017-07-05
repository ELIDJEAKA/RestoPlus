'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const BootBot = require('bootbot');
const bot = new BootBot({
  accessToken: 'EAAGxoAhUUmMBADRdpzPwmyZBTZAqCQviH8ZByDw9VGkeWNZAIUgEMhWMpXVaw1LTUp1RSL3cS3sn6luZASq8s8al1eu36EvuferkfX7QyILJZAOy5wX3D7U5heMZCp7Re5NTu0XfUMltU33bTKmcuZAZBUI0I5cV6ZAUQLGNneaAsARq1CzXR5E1Jq',
  verifyToken: 'Resto+',
  appSecret: 'a5d353d3d19ff6cc270ed0010b12ab1b'
});

// SET A GETSTARTED BUTTON
bot.setGetStartedButton((payload, chat) => {
  const welcome1 = `Bienvenue à Resto+ ...`;
  const welcome2 = `Type START or PLAY to join the challenge!`;
  const options = { typing: true };
  chat.say(welcome1, options)
    .then(() => chat.say(welcome2, options));
});

// SET A PERSISTENT MENU
bot.setPersistentMenu([

  {
    title: 'Plats',
    type: 'nested',
    call_to_actions: [
      {
        title: 'Entrée',
        type: 'postback',
        payload: 'ENTREE_PAYLOAD'
      },
      {
        title: 'Resistance',
        type: 'postback',
        payload: 'RESISTANCE_PAYLOAD'
      },
      {
        title: 'Dessert',
        type: 'postback',
        payload: 'DESSERT_PAYLOAD'
      },
    ]
  },
  {
    title: 'A Propos',
    type: 'postback',
    payload: 'PROPOS_PAYLOAD'
  },
  {
    title: 'Page Facebook',
    type: 'web_url',
    url: 'https://www.facebook.com/RestoPluss/'
  }
])



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', function (req, res) {
    try {
        if (req.body) {
                console.log(req.body)
                let requestBody = req.body;
                if(requestBody.result.resolvedQuery.toLowerCase() == 'entrée' || requestBody.result.resolvedQuery.toLowerCase() == 'entree')
                {
                  bot.sendTextMessage(req.body.originalRequest.data.sender.id,'cool');
                  console.log(requestBody.result.resolvedQuery)
                }
              }
        } catch (err) {
                console.error("Can't process request", err);

                return res.status(400).json({
                    status: {
                        code: 400,
                        errorType: err.message
                    }
                });
            }
        });





//bot.start();
app.listen((process.env.PORT || 3000), function () {
    console.log("Server listening on port 3000");
});
