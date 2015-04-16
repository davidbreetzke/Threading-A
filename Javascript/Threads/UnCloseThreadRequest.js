/*!
 * unCloseThreadRequest class, used to make a request for a thread to be unclosed
 * Must specify the thread that to be unclosed
 */

//! Public
module.exports = UnCloseThreadRequest;

function UnCloseThreadRequest(threadToUnClose)
{
    this.threadToUnClose = threadToUnClose;
}
