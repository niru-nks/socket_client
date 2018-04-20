var socketCluster = require( 'socketcluster-client' );
var socket = socketCluster.connect( {
    hostname:"10.139.50.117",
    port: 8000
} );

socket.on('connect', () => {

    console.log("connected");
    socket.on('message',function(data){
    	console.log(data);
    })
})
