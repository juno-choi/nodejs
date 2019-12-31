var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);

    //파일을 읽어서 description에 내용으로 변환하여 웹페이지를 동작하게 만듦
    //서버를 껐다 키지 않아도 페이지가 실행될 때 마다 자동으로 파일을 읽어오기 때문에 바로 바로 적용됨
    fs.readFile(`../data/${queryData.id}`, 'utf-8', function(err, description){
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${queryData.id}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.end(template);

    })
    //console.log(__dirname + url);
    //사용자에게 값을 반환해주는 곳


});
app.listen(3000);
