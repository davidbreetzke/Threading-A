/*!
 * moveThreadRequest class, used to make a request for a thread to be moved
 * Must specify the thread to be moved, the new parent to move the thread to, and the userid of the person requesting the move
 */

//! Public
module.exports = MoveThreadRequest;

function MoveThreadRequest(threadToMove, newParent, userid) {
    this.threadToMove = threadToMove;
    this.newParent = newParent;
    this.userid = userid;
}
