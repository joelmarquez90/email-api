var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var SparkPost = require('sparkpost');
var pjson = require('./package.json');

var client = new SparkPost(process.env.SPARKPOST_API_KEY);

var allowCrossDomainConfig = function(req, res, next) {

  res.header('Access-Control-Allow-Origin', req.get('origin'));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  if ('OPTIONS' === req.method) {
    return res.sendStatus(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomainConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
  Returns the version of this API
*/
app.get('/', function (req, res) {
  return res.send({ version: pjson.version });
});

/* You should send this parameters in the body:
  {
    "name": "My Name",
    "email": "myemail@gmail.com",
    "phone": "1234567890",
    "message": "My Message"
  }
*/
app.post('/email', function (req, res) {

  var name = req.body.name || '';
  var email = req.body.email || '';
  var phone = req.body.phone || '';
  var message = req.body.message || '';

  var from = process.env.EMAIL_FROM || '';
  var to = process.env.EMAIL_TO || '';

  client.transmissions.send({
    content: {
      from: from,
      subject: 'Contact: ' + name,
      text:'Name: ' + name + '\nEmail: ' + email + '\nPhone number: ' + phone + '\n\n' + message
    },
    recipients: [
      {address: to}
    ]
  })
  .then(data => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(400);
  });
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Email API running!');
});
