var test = require('unit.js');
var Post = require("../Threads/Post.js");
var Thread = require("../Threads/Thread.js");
var CloseThreadRequest = require("../Threads/CloseThreadRequest");
var UnCloseThreadRequest = require("../Threads/UnCloseThreadRequest");
var mongoose = require("mongoose");

describe('Unit Tests for Threads', function()
{   var MockBuzz;

    var trigger = function()
    {
        throw new Error('Whoops!');
    };


    it('Test Post', function()
    {
      console.log("");
      console.log("Test Post:");

      console.log("Create MockBuzz");
      MockBuzz = {
          buzzSpaceId : "MockBuzzSpace",
          rootThread : new Thread(new Post("text", "Root thread content", Date.now(), "Root Thread Title", "admin_user_post", "information"), "MockBuzzSpace")
          };
      MockBuzz.rootThread.saveThread();

      test
        .object(MockBuzz).hasProperty("buzzSpaceId", "MockBuzzSpace")
        .object(MockBuzz.rootThread).hasProperty("_id", MockBuzz.rootThread._id)
        .object(MockBuzz.rootThread.post).hasProperty("mimeType", "text")
        .object(MockBuzz.rootThread.post).hasProperty("content", "Root thread content")
        .object(MockBuzz.rootThread.post).hasProperty("title", "Root Thread Title")
        .object(MockBuzz.rootThread.post).hasProperty("submitter", "admin_user_post")
        .object(MockBuzz.rootThread.post).hasProperty("postType", "information")
        .error(trigger)
          .hasMessage('Whoops!');
    });



    it('Test Post To Thread', function()
    {
      console.log("");
      console.log("Test Post To Thread:");

      console.log("Create Mock Post");
      var newSubmitPostRequest = {
          threadToPostIn : MockBuzz.rootThread,
          newPost: new Post("text", "I would like to ask a question?", Date.now(), "My Parent is Root", "lowerUser", "question"),
          userId : "lowerUser",
          buzzSpaceId : MockBuzz.buzzSpaceId
        };

      console.log("Post To Thread");
      MockBuzz.rootThread.submitPost(newSubmitPostRequest);

      /*console.log("TTTTTTTTTTTT");
      console.log(MockBuzz.rootThread.children[0].parent._id);
      console.log(MockBuzz.rootThread._id);*/

      test
        .object(MockBuzz).hasProperty("buzzSpaceId", "MockBuzzSpace")
        .object(MockBuzz.rootThread.children[0].parent).hasProperty("_id", MockBuzz.rootThread._id)
        .object(MockBuzz.rootThread.children[0]).hasProperty("_id", MockBuzz.rootThread.children[0]._id)
        .object(MockBuzz.rootThread.children[0].post).hasProperty("mimeType", "text")
        .object(MockBuzz.rootThread.children[0].post).hasProperty("content", "I would like to ask a question?")
        .object(MockBuzz.rootThread.children[0].post).hasProperty("title", "My Parent is Root")
        .object(MockBuzz.rootThread.children[0].post).hasProperty("submitter", "lowerUser")
        .object(MockBuzz.rootThread.children[0].post).hasProperty("postType", "question")
        .error(trigger)
          .hasMessage('Whoops!');
    });



    it('Test closeThread', function()
    {
        console.log("");
        console.log("Test closeThread");

        var newCloseThreadRequest= {
          threadToClose : MockBuzz.rootThread
        };

        MockBuzz.rootThread.closeThread(newCloseThreadRequest);

        MockBuzz.rootThread.buzzSpaceId = "MockBuzzSpaceChangedTo";
        MockBuzz.rootThread.isClosed = false;
        MockBuzz.rootThread.post.content = "Changed The Content";

      test
        .object(MockBuzz).hasProperty("buzzSpaceId", "MockBuzzSpace")
        .object(MockBuzz.rootThread).hasProperty("isClosed", true)
        .object(MockBuzz.rootThread).hasProperty("_id", MockBuzz.rootThread._id)
        .object(MockBuzz.rootThread.post).hasProperty("mimeType", "text")
        .object(MockBuzz.rootThread.post).hasProperty("content", "Root thread content")
        .object(MockBuzz.rootThread.post).hasProperty("title", "Root Thread Title")
        .object(MockBuzz.rootThread.post).hasProperty("submitter", "admin_user_post")
        .object(MockBuzz.rootThread.post).hasProperty("postType", "information")
        .error(trigger)
          .hasMessage('Whoops!');
    });


    it('Test uncloseThread', function()
    {
        console.log("");
        console.log("Test uncloseThread");

        var newUnCloseThreadRequest= {
          threadToUnClose : MockBuzz.rootThread
        };

        MockBuzz.rootThread = MockBuzz.rootThread.uncloseThread(newUnCloseThreadRequest);

        console.log("Change The Content");
        MockBuzz.rootThread.post.content = "Changed The Content";

      test
        .object(MockBuzz).hasProperty("buzzSpaceId", "MockBuzzSpace")
        .object(MockBuzz.rootThread).hasProperty("isClosed", false)
        .object(MockBuzz.rootThread).hasProperty("_id", MockBuzz.rootThread._id)
        .object(MockBuzz.rootThread.post).hasProperty("mimeType", "text")
        .object(MockBuzz.rootThread.post).hasProperty("content", "Changed The Content")
        .object(MockBuzz.rootThread.post).hasProperty("title", "Root Thread Title")
        .object(MockBuzz.rootThread.post).hasProperty("submitter", "admin_user_post")
        .object(MockBuzz.rootThread.post).hasProperty("postType", "information")
        .error(trigger)
          .hasMessage('Whoops!');
    });

});
