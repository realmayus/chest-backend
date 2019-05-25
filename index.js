const http = require("http");
const mysql = require("mysql");


const error = {"requestOK": false, "error": "Not specified!"};


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "playtimetracker"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function handleReq(req) {
    let answer = null;
    if (req.url.startsWith("/chest")) {
        answer = {"requestOK": true, data: "Chest is the answer!"}
    } else if (req.url.startsWith("/playtime/")) {
        const server = req.url.replace("/playtime/", "").split("/")[0];

        if(server != null && server !== "") {
            const sql = "SELECT `player`, `playtime` FROM " + server + ";";
            console.log("SQL Query: " + sql);
            con.query(sql, function (err, rows, fields) {
                if (err) throw err;
                var objs = [];
                for (var i = 0;i < rows.length; i++) {
                    objs.push({player: rows[i].player, playtime: rows[i].playtime});
                }
                //console.log(objs);
                return objs;//TODO: HERE
            });


        } else {
            answer = {"requestOK": false, "error": "Server not found!"};
        }

    } else {
        answer = error;
    }
    return answer;
}


http.createServer(function (request, response) {
    console.log("Request mit URL: " + request.url);
    response.writeHead(200, {'Content-Type': 'application/json'});
    var responsejson = handleReq(request);
    //console.log(responsejson);
    var res = responsejson; //TODO: HERE
    response.write(JSON.stringify(res));
    response.end();
}).listen(8081);

console.log('Gestartet auf port 8081');
console.log('Go to http://localhost:8081/');
