/* jshint node:true */

var cloak = require('cloak');

var serverPort = 8090;

var sendLobbyCount = function(arg) {
    this.messageMembers('userCount', this.getMembers().length);
};

cloak.configure({
    port: serverPort,
    messages: {
        chat: function(msg, user) {
            user.getRoom().messageMembers('chat', msg);
        }
    },
    lobby: {
        newMember: sendLobbyCount,
        memberLeaves: sendLobbyCount
    }
});

cloak.run();
