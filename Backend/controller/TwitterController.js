var request = require('request');
require('dotenv').config();


module.exports = (req,res) => {
    var query = req.body.keyword;
    var newQuery = query.replace(':', ' ');
    console.log(newQuery);
    var options = {
        'method': 'GET',
        'url': 'https://api.twitter.com/2/tweets/search/recent?query='+ newQuery,
        'headers': {
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAABYhVQEAAAAACQjzSUb8KT3VG1nQgJdccQED%2F3E%3D9xRG40ob5IvMQIzuCuY8oU55jkqnAoqq1xWJx5zu7hSVxtuLMH',
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
      });
}
