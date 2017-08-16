var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
  fs.readFile(path,null, (error, data) =>{
    if(error) {
      response.writeHead(404);
      response.write('File Not Found');
    } else {
      response.write(data);
      response.end();
    }
  });
}
module.exports = {
  handleRequests: function(request,response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(request.url).pathname;
    switch(path) {
      case '/': renderHTML('./index.html', response);
      break;
      case '/login': renderHTML('./login.html', response);
      break;
    }
  },
}
