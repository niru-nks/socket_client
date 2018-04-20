var socketCluster = require( 'socketcluster-client' );
var socket = socketCluster.connect( {
    hostname:"10.139.50.124",
    port: 8000
} );

socket.on('connect', function(){

    console.log("connected");
    socket.on('message',function(data){
    	console.log(data);
    })
})
