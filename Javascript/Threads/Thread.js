/*!
 * Thread class, contains the posts as well as references to parent and children Threads to create the tree structure
 * TODO: Add class variables (and possible auxiliary functions)
 */

// commented out until modules are completed and required
//var Authorization = require("./Authorization");
//var MoveThreadRequest = require("./MoveThreadRequest");
var CloseThreadRequest = require("./CloseThreadRequest");
var UnCloseThreadRequest = require("./UnCloseThreadRequest");
var SubmitPostRequest = require("./SubmitPostRequest");
var SubmitPostResults = require("./SubmitPostResult");
var Post = require("./Post");
var connection = require("database");
// maybe add connection.mongoose
var mongoose = connection.mongoose;

// schema for writing thread to database
var threadSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    thread_DateCreated : Date,
    thread_PostContent : [String],
    thread_SpaceID : String,
    thread_CreaterID : String,
    thread_Parent : mongoose.Schema.Types.ObjectId,
    thread_Archived : Boolean,
    thread_PostType : String,
    thread_Closed : Boolean,
    thread_DateClosed : Date
});

//! Public
//module.exports = Thread;

// constructs a thread object
// IMPORTANT: This thread is NOT saved in the database, the user of this module is resposible for calling the saveThread(_id) function to save the thread
var Thread = function (post, buzzSpace, parent) { //TODO: Add relevant function parameters and class variables
    //console.log("Creating Thread using POST, BUZZSPACE and PARENT");

    //var temp = 999;
    if (!parent) {
        //console.log("parent is NULL");
        parent = this;
        //temp = 998;
    };

    // changed thread_Id to _id to use ObjectId
    this._id = mongoose.Types.ObjectId();
    this.post = post;
    this.parent =  parent;
    this.children = [];
    this.buzzSpace = buzzSpace;
    this.threadSummary = null;
    this.creatorsId = post.submitter;
    this.isArchived =false;
    this.isClosed =false;

    console.log(this._id);

    // mid-level attributes
    this.dateCreated = Date.now();
    this.dateClosed = null;

    // saving thread to database is user's responsibility
    // persist thread into the database
    //this.saveThread();

    //console.log("Thread created");
    return this;
};

// adds the passed thread to the list of children of the current thread
Thread.prototype.addChild = function(newChild) {
    this.children.push(newChild);
    newChild.parent = this;
};

Thread.prototype.saveThread = function(){
    // create model to save to database
    var Thread_mongoose = mongoose.model("Thread", threadSchema, "Threads");
    var threadToSave = new Thread_mongoose(
        {
            _id : this._id,
            thread_DateCreated : this.dateCreated,
            //thread_Name : newThread.thread_Name,
            thread_PostContent : this.post.content,
            thread_SpaceID : this.buzzSpace,
            thread_CreaterID : this.creatorsId,
            thread_Parent : this.parent._id,
            thread_Archived : this.isArchived,
            //thread_Attachments : newThread.thread_Attachments,
            thread_PostType : this.post.postType,
            thread_Closed : this.isClosed,
            thread_DateClosed : this.dateClosed
        }
    );

    // save 'this' thread to database
    threadToSave.save(function (err, product, numberAffected, threadToSave) {
        if (err) return console.error(err);
        console.log("product: " + product);
        console.log("numberAffected: " + numberAffected);
    });
};

// function not complete!!!
Thread.prototype.findThread = function(toFindId) {
    console.log("Searching for Thread");
    var Thread_mongoose = mongoose.model("Thread", threadSchema, "Threads");
    var threadToSave = new Thread_mongoose(
        {
            _id : this._id,
            thread_DateCreated : this.dateCreated,
            //thread_Name : newThread.thread_Name,
            thread_PostContent : this.post.content,
            thread_SpaceID : this.buzzSpace,
            thread_CreaterID : this.creatorsId,
            thread_Parent : this.parent._id,
            thread_Archived : this.isArchived,
            //thread_Attachments : newThread.thread_Attachments,
            thread_PostType : this.post.postType,
            thread_Closed : this.isClosed,
            thread_DateClosed : this.dateClosed
        }
    );

    return Thread_mongoose.findById({ _id : toFindId }, function(err, doc) {
        console.log("found: " + doc);
        return doc;
    });
};

Thread.prototype.addSummary = function() {
    this.threadSummary = threadSummary;
};

// creates a new thread from the data received and writes this new thread to the database
Thread.prototype.submitPost = function(submitPostRequest) { //TODO: Add Request object as function parameter  (E.g. submitPostRequest)

    //TODO: Confirm correct parameters to be passed to isAuthorized
    // Authorization to be handled next phase
/*    var isAuthorized = new Authorization().isAuthorized(new isAuthorizedRequest(submitPostRequest.userid,submitPostRequest.threadToPostIn.buzzSpace)); //TODO: Double check how the isAuthorized function returns (object or plain boolean?)
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
    }*/


    // find BuzzSpace to post in here, via database
    //var tempThreadDoc = this.findThread(this._id);
    //console.log("---------------------------" + tempThreadDoc.thread_SpaceID);

    // thread saved to database inside constructor
    currentThread = submitPostRequest.threadToPostIn;
    if(currentThread.isClosed == false)
    {
      var newThread = new Thread(submitPostRequest.newPost, submitPostRequest.buzzSpaceId, this);
      this.addChild(newThread);
      newThread.saveThread();
    }
    else
    {
      return { message: "Post was unsuccessfully made! Thread is closed" };
    }

    // next line of code did not work
    //return new SubmitPostResults('Post was successfully made!');
    return { message: "Post was successfully made!" };
};

/*! Jandre */
Thread.prototype.closeThread = function(CloseThreadRequest) {

    threadToClose = CloseThreadRequest.threadToClose;

    threadToClose.isClosed = true;
    Object.freeze(threadToClose);
    if(threadToClose.children.length > 0)
    {
        for(var i = 0; i < threadToClose.children.length; i++)
        {
            Object.freeze(threadToClose.children[i]);
            console.log("Closed Children");
        }

    }
    Object.freeze(threadToClose.children);
    Object.freeze(threadToClose.post);
    console.log("Thread Closed");
};

/*! Matthew */
Thread.prototype.moveThread = function(moveThreadRequest) {

    threadToMove = moveThreadRequest.threadToMove;
    newParent = moveThreadRequest.newParent;

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

// converts the current thread into a string.
// IMPORTANT: this is NOT a JSON string
Thread.prototype.toString = function() {
    var str = "";
    str += "thread: " + this._id;
    str += "\n * parent: " +  this.parent._id;

    for (var i = 0; i < this.children.length; ++i) {
        str += "\n * child: " + this.children[i].threadId;
    }
    str += "\n * buzzSpace: " + this.buzzSpace;
    str += "\n * thread summary: " + this.threadSummary;
    str += "\n * creatorsId: " + this.creatorsId;
    str += "\n * archived: " + this.isArchived;
    str += "\n * closed: " + this.isClosed;

    str += "\npost:\n * MIMETYPE: " + this.post.mimeType;
    str += "\n * content: " + this.post.content;
    str += "\n * date created: " + this.post.dateTime;
    str += "\n * title: " + this.post.title;
    str += "\n * submitter: " + this.post.submitter;
    str += "\n * postType: " + this.post.postType;
    str += "\n * children: [";

    for (var i = 0; i < this.children.length; ++i) {
        str += " " +  this.children[i]._id;
    }
    str += " ]";
    return str;
};

/*! Future functions to be delegated and implemented */
/*! Jandre */
Thread.prototype.uncloseThread = function(UnCloseThreadRequest)
{
      threadToUnClose = UnCloseThreadRequest.threadToUnClose;

      Object.unfreeze=function(o)
      {
           var oo=undefined;

           if(typeof o == 'object')
           {
          		oo={};
              unlockedPost={};

          		for (var property in o)
          		{
                  oo[property] = o[property];

                  if(property == "children")
                  {
                      if(threadToUnClose.children.length > 0)
                      {
                          unlockedChildren=[];
                          var clone=function(v)
                          {unlockedChildren.push(v)};
                          o.children.forEach(clone);
                      }
                      oo.children = unlockedChildren;
                  }

                  if(property == "post")
                  {
                      for (var property in o.post)
                      {
                        unlockedPost[property] = o.post[property];
                      }
                      oo.post = unlockedPost;
                  }
          		}
           }
           oo.isClosed = false;
           return oo;
      }
      threadToUnClose = Object.unfreeze(threadToUnClose);
      return threadToUnClose;
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

module.exports = Thread;
