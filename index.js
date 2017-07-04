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


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/menu', function (req, res) {
    try {

        if (req.body) {
                console.log(req.body.originalRequest.data.sender.id)
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
// SET A PERSISTENT MENU
        bot.setPersistentMenu([

          {
            title: 'Menu',
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
                payload: 'rESISTANCE_PAYLOAD'
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




// SET A GETSTARTED BUTTON

bot.setGetStartedButton((payload, chat) => {
  chat.sendMessage('Welcome to BootBot. What are you looking for?');
});



app.listen((process.env.PORT || 3000), function () {
    console.log("Server listening on port 3000");
});
