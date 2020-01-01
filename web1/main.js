var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){

      if(queryData.id === undefined){
          fs.readFile(`../data/${queryData.id}`, 'utf-8', function(err, description){
            var title = `Welcome`;
            var description = 'Hello, Node.js';
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
              //200신호는 성공적으로 전송했다.
          response.writeHead(200);
            response.end(template);
        });
      } else{

              //url 정보를 분석하여 console에 나타내주는 코드
              //console.log(url.parse(_url, true));

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

                    //200신호는 성공적으로 전송했다.
                    response.writeHead(200);
                    response.end(template);

              });
              //console.log(__dirname + url);
              //사용자에게 값을 반환해주는 곳
      }

    } else{
      //404신호는 파일을 찾을 수 없을 때
      response.writeHead(404);
      response.end('Not found');
    }


});
app.listen(3000);
