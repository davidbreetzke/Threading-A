var Post = require("./Threads/Post.js");
var Thread = require("./Threads/Thread.js");
var mongoose = require("mongoose");

console.log("-- Tiny program to test functionality --");

// creates mock buzz space into which a thread will be posted
var MockBuzz = {
    buzzSpaceId : "MockBuzzSpace",
    rootThread : new Thread(new Post("text", "Root thread content", Date.now(), "Root Thread Title", "admin_user_post", "information"), "MockBuzzSpace")
};
// saves root thread to database
MockBuzz.rootThread.saveThread();

// building SubmitPostRequest function
var newSubmitPostRequest = {
    threadToPostIn : MockBuzz.rootThread,
    newPost: new Post("text", "I would like to ask a question?", Date.now(), "My Parent is Root", "lowerUser", "question"),
    userId : "lowerUser",
    buzzSpaceId : MockBuzz.buzzSpaceId
};

// console.log("mock buzzSpace ID: " + newSubmitPostRequest.buzzSpaceId);
// console.log(newSubmitPostRequest.newPost);

// Submitting post to a thread
MockBuzz.rootThread.submitPost(newSubmitPostRequest);
MockBuzz.rootThread.submitPost(newSubmitPostRequest);

// searching for a specific thread using the thread _id (ObjectId : generated primary key)
var foundThread = MockBuzz.rootThread.findThread(mongoose.Types.ObjectId("5514383f6a3a4c6414ffa18d"));
console.log("found thread : " + foundThread.thread_SpaceID);

