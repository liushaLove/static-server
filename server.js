let http = require("http"),
    fs = require("fs"),
    url = require("url"),
    port = process.argv[2];

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
    process.exit(1);
}

let server = http.createServer((req,response)=>{
    let parseUrl = url.parse(req.url,true),
        pathWithQuery = req.url,
        queryString = '';
    
    if(pathWithQuery.indexOf('?') >= 0){
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
    }

    let path = parseUrl.pathname,
        query = parseUrl.query,
        method = req.method;

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery);


    response.statusCode = 200;
  
    let filePath = path === "/" ? '/index.html' : path,
        content;
    let index = filePath.lastIndexOf("."),
        suffix = filePath.substring(index);

    let fileTypes = {
        ".html":"text/html",
        ".css":"text/css",
        ".js":"text/javascript",
        ".xml":"text/xml",
        ".png":"image/png",
        ".jpg":"image/jpeg"
    }

    response.setHeader('Content-Type',`${fileTypes[suffix] || 'text/html'};charset=utf-8`);

    try{
        content = fs.readFileSync(`./public${filePath}`);

    }catch(error){
        content = "文件不存在！";
        response.statusCode = 404;
    }
    response.write(content);  
    response.end();
});

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)