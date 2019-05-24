const http = require("http");


const error = {"requestOK": false, "error": "Not specified!"};

function handleReq(req) {
    let answer;
    if(req.url.startsWith("/chest")) {
        answer = {"requestOK": true, data: "Chest is the answer!"}
    } else {
        answer = error;
    }
    return answer;
}


http.createServer(function (request, response) {
    console.log("Request mit URL: " + request.url);
    let responsejson = handleReq(request);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(responsejson));
    response.end();
}).listen(8081);

console.log('Gestartet auf port 8081');
