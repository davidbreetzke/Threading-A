/*!
 * HideThreadRequest class, used to make a request for a thread to be hidden
 * Must specify the thread that is to be hidden and the userid of the moderator requesting to hide the thread
 */

//! Public
module.exports = HideThreadRequest;

function HideThreadRequest(threadToHide, userid)
{
    this.threadToHide = threadToHide;
    this.userid = userid;
}
