# email-api

This is a simple API that provides a POST route that allows you to send emails with [SparkPost API](https://developers.sparkpost.com/api/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed, and that you have a valid SparkPost API Key.

```sh
git clone git@github.com:joelmarquez90/email-api.git # or clone your own fork
cd email-api
npm install
npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/joelmarquez90/email-api)

## Author

Joel Márquez <90joelmarquez@gmail.com> http://github.com/joelmarquez90

## License

 - **MIT** : http://opensource.org/licenses/MIT
