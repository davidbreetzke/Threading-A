/*
This class is used for closing a thread, preventing any further changes from being made to it
 */

// Public
module.exports = CloseThreadRequest;

function CloseThreadRequest(threadToClose, userid) {
    this.threadToClose = threadToClose;
    this.userid = userid;
}
