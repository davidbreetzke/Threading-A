/*!
 * Thread class, contains the posts as well as references to parent and children Threads to create the tree structure
 * TODO: Add class variables (and possible auxiliary functions)
 */

//var Authorization = require("./Authorization");
var MoveThreadRequest = require("./MoveThreadRequest");
var SubmitPostRequest = require("./SubmitPostRequest");
var SubmitPostResults = require("./SubmitPostResult");
var CloseThreadRequest = require("./CloseThreadRequest");

//! Public
module.exports = Thread;

function Thread(post, buzzSpace) {
    this.post = post;
    this.parent = null;
    this.children = [];
    this.buzzSpace = buzzSpace;
    this.threadSummary = null;
    this.creatorsId=null;
    this.threadId=null;
    this.isHidden=false;
    this.isClosed=false;
};

function Thread(post, buzzSpace, parent) { //TODO: Add relevant function parameters and class variables
    this.post = post;
    this.parent = parent;
    this.children = [];
    this.buzzSpace = buzzSpace;
    this.threadSummary = null;
    this.creatorsId=null;
    this.isHidden=parent.isHidden;
    this.isClosed=parent.isClosed;
    this.threadId=null;
};

Thread.prototype.addChild = function(newChild) {
    this.children.push(newChild);
    newChild.parent = this;
};

Thread.prototype.addSummary = function() {
    this.threadSummary = threadSummary;
}

/*! Aluwani */

Thread.prototype.submitPost = function(submitPostRequest) { //TODO: Add Request object as function parameter  (E.g. submitPostRequest)

    //TODO: Confirm correct parameters to be passed to isAuthorized
    var isAuthorized = new Authorization().isAuthorized(new isAuthorizedRequest(submitPostRequest.userid,submitPostRequest.threadToPostIn.buzzSpace)); //TODO: Double check how the isAuthorized function returns (object or plain boolean?)
    if(!isAuthorized) { //! User is not authorized to make a post in this current space/thread
        console.log("Insufficient Permissions");

        return new SubmitPostResults('Insufficient Permissions');
    }

    if(this.getThread(threadToPostIn.threadId)==null) { //! Thread no longer exist
        console.log("Thread no longer exist");

        return new SubmitPostResults('Thread no longer exist');
    }

    if(submitPostRequest.threadToPostIn.isHidden) { //! check if parent thread is hidden
        console.log('The thread you are trying to post in is hidden');

        return new SubmitPostResults('The thread you are trying to post in is hidden');
    }
    else if(submitPostRequest.threadToPostIn.isClosed) { //check if parent thread is closed
        console.log('The thread you are trying to post in is closed');

        return new SubmitPostResults('The thread you are trying to post in is closed');
    }





    this.post = submitPostRequest.newPost;
    this.parent =  submitPostRequest.threadToPostIn;
    this.children = [];
    this.buzzSpace = threadToPostIn.buzzSpace;
    this.creatorsId=submitPostRequest.userid;
    this.threadSummary = null;
    this.threadId=submitPostRequest.newThreadId;



    return new SubmitPostResults('Post was successfully made!');
};

/*! Jandre */
Thread.prototype.closeThread = function(CloseThreadRequest) {

    threadToClose = CloseThreadRequest.threadToClose;
    userid = CloseThreadRequest.userid;

    var isAuthorized = new Authorization().isAuthorized(new isAuthorizedRequest(userid));
    if(isAuthorized){
      Object.freeze(threadToClose.parent);
      if(this.children.length > 0)
      {
          for(var i = 0; i < threadToClose.parent.children.length; i++)
          {
            Object.freeze(threadToClose.parent.children[i]);
          }
          //console.log("Closed Children");
      }
      console.log("Thread Closed");
      threadToClose.isClosed = true;
    }
    else{
      console.log("Insufficient Permissions");
    }
};

/*! David */
//Use Case is not clear about what params to pass, passing a request object to keep things standard
Thread.prototype.hideThread = function(HideThreadRequest) {
    threadToHide = HideThreadRequest.threadToHide;
    userid = HideThreadRequest.userid;

    //TODO: Confirm correct parameters to be passed to isAuthorized
    //TODO: Find out how to check authorisation for moderator, not normal user
    var isAuthorized = new Authorization().isAuthorized(new isAuthorizedRequest(userid));
    //TODO: Double check how the isAuthorized function returns (object or plain boolean?)
    if(!isAuthorized) { //! User is not authorized to move this thread
        console.log("Insufficient Permissions");
        return false;
    }

    if(threadToHide.isHidden) {
        console.log("Thread is already hidden.")
        return false;
    }
    else {
        if(this.children.length > 0)
        {
            for(var i = 0; i < threadToHide.children.length; i++)
            {
                threadToHide.children[i].isHidden = true;
            }
        }
        return threadToHide.isHidden;
    }
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
