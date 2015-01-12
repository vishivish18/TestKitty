/**
 * app.js
 *
 * Front-end code and event handling for sailsChat
 *
 */


// Attach a listener which fires when a connection is established:
io.socket.on('connect', function socketConnected() {

    // Show the main UI
  console.log('this is emitted from client');
    console.log('this is emitted from client2');

});
