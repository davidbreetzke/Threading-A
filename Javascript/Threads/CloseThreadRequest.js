/*!
 * closeThreadRequest class, used to make a request for a thread to be closed
 * Must specify the thread that to be closed and the userid of the person requesting the close the thread
 */

//! Public
module.exports = CloseThreadRequest;

function CloseThreadRequest(threadToClose, userid)
{
    this.threadToClose = threadToClose;
    this.userid = userid;
}
