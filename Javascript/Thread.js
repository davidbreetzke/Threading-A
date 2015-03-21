/*!
 * Thread class, contains the posts as well as references to parent and children Threads to create the tree structure
 * TODO: Add class variables (and possible auxiliary functions)
 */

//! Public
module.exports = Thread;

function Thread() { //TODO: Add relevent function parameters and class variables
}

/*! Aluwani */
Thread.prototype.submitPost = function() { //TODO: Add Request object as function parameter  (E.g. submitPostRequest)
};

/*! David */
Thread.prototype.closeThread = function() { //TODO: Add Request object as function parameter
};

/*! Jandre */
Thread.prototype.hideThread = function() { //TODO: Add Request object as function parameter
};

/*! Matthew */
Thread.prototype.moveThread = function(newParent) {

    //TODO: Check parameters to be passed to isAuthorized, if any
    var isAuthorized = Authorization.isAuthorized().isAuthorized; //TODO: Double check how the isAuthorized function returns (object or plain boolean?)
    if(!isAuthorized) { //! User is not authorized to move this thread
        console.log("Insufficient Permissions");
        return false;
    }

    var index = this.parent.children.indexOf(this);

    if (index < 0) { //! This thread was not found in its current parent's child list, something went wrong.
        console.log("Child missing from its parent's child list");
        return false;
    }
    else {
        this.parent.children.splice(index, 1);
    }

    if(this.isHidden && !newParent.isHidden) { //! Unhide this thread as its new parent is not hidden
        this.unhideThread();
    }
    else if(newParent.isHidden && !this.isHidden) { //! Hide this thread as its parent is hidden
        this.hideThread();
    }

    this.parent = newParent;
    newParent.children.push(this);
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


