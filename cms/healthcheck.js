var http = require("http");

var options = {  
    host: 'localhost',
    port: '8080',
    path: '/api/v2/health/live',
    timeout: 2000
};

var request = http.request(options, (res) => {
    if (res.statusCode != 200) {  
        process.exit(1);
    }
    process.exit(0);
});

request.on('error', function(err) {  
    process.exit(1);
});

request.end();  