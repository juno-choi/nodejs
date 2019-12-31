var fs = require('fs');

//파일을 nodejs로 읽는 방법
fs.readFile('sample.txt', function(err,data){
  console.log(data);
});
