var express        = require( 'express' );
var http           = require( 'http' );
var jsforce        = require('jsforce');

var app            = express();
app.set( 'port', process.env.PORT || 3011 );
app.get('/', function (req, res) {
  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
     loginUrl : 'https://test.salesforce.com'
  });
  var username = 'apandy@adt.com.adtdev2';
  var password = 'Apsp0419';
  var apexBody = "System.debug('Hello, World');";
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    const conn2 = ({
      instanceUrl :conn.instanceUrl,
      accessToken :conn.accessToken  
    });
    conn.tooling.executeAnonymous(apexBody, function(err, res) {
    if (err) { return console.error(err); }
      console.log("compiled?: " + res.compiled); // compiled successfully
      console.log("executed?: " + res.success); // executed successfully
    });
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
    res.send('JSForce Connect Successed!');
  });
  //res.send('Hello World');
  });

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});

