/*!
 * Thread class, contains the posts as well as references to parent and children Threads to create the tree structure
 * TODO: Add class variables (and possible auxiliary functions)
 */

//var Authorization = require("./Authorization");
var MoveThreadRequest = require("./MoveThreadRequest");

//! Public
module.exports = Thread;

function Thread(post, buzzSpace) {
    this.post = post;
    this.parent = null;
    this.children = [];
    this.buzzSpace = buzzSpace;
    this.threadSummary = null;
    this.hidden = false;
};

function Thread(post, buzzSpace, parent) { //TODO: Add relevent function parameters and class variables
    this.post = post;
    this.parent = parent;
    this.children = [];
    this.buzzSpace = buzzSpace;
    this.threadSummary = null;
    this.hidden = false;
};

Thread.prototype.addChild = function(newChild) {
    this.children.push(newChild);
    newChild.parent = this;
};

Thread.prototype.addSummary = function() {
    this.threadSummary = threadSummary;
}

/*! Aluwani */
Thread.prototype.submitPost = function() { //TODO: Add Request object as function parameter  (E.g. submitPostRequest)
};

/*! jandre */
Thread.prototype.closeThread = function() { //TODO: Add Request object as function parameter
};

/*! David */
Thread.prototype.hideThread = function() { //TODO: Add Request object as function parameter
};

/*! Matthew */
Thread.prototype.moveThread = function(moveThreadRequest) {

    threadToMove = moveThreadRequest.threadToMove;
    newParent = moveThreadRequest.newParent;
    userid = moveThreadRequest.userid;

    //TODO: Confirm correct parameters to be passed to isAuthorized
    var isAuthorized = new Authorization().isAuthorized(new isAuthorizedRequest(userid)); //TODO: Double check how the isAuthorized function returns (object or plain boolean?)
    if(!isAuthorized) { //! User is not authorized to move this thread
        console.log("Insufficient Permissions");
        return false;
    }
    var index = threadToMove.parent.children.indexOf(threadToMove);

    if (index < 0) { //! This thread was not found in its current parent's child list, something went wrong.
        console.log("Child missing from its parent's child list");
        return false;
    }
    else {
        threadToMove.parent.children.splice(index, 1);
    }

    if(threadToMove.isHidden && !newParent.isHidden) { //! Unhide this thread as its new parent is not hidden
        if(!threadToMove.unhideThread()) { //unhideThread request was unsuccessfull
            return false;
        }
    }
    else if(newParent.isHidden && !threadToMove.isHidden) { //! Hide this thread as its parent is hidden
        if(threadToMove.hideThread()) { //hideThread request was unsuccessfull
            return false;
        }
    }

    threadToMove.parent = newParent;
    newParent.children.push(threadToMove);
    return true;
};


/*! Future functions to be delegated and implemented */
Thread.prototype.uncloseThread = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.summarizeThread = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.unhideThread = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.queryThreads = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.getUserThreads = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.getThreadsForPeriod = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.countDescendants = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.getThread = function() { //! TODO: Add Request object as function parameter
};

Thread.prototype.getPost = function() { //! TODO: Add Request object as function parameter
};


