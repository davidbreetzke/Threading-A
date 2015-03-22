/*
 This class is used for containing the result of closing a thread
 */

// Public
module.exports = CloseThreadResult;

function CloseThreadResult(success, userid) {
    this.sucess = success;
    this.userid = userid;
}
