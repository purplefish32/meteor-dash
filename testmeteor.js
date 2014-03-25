Router.map(function(){
    this.route('dashboard', {path: '/'});
    this.route('hosts');
    this.route('reports');
    this.route('admin');
    this.route('login');
    this.route('logout');
});


chatStream = new Meteor.Stream('chat');

if (Meteor.isClient) {
  chatStream.on('message', function(message) {
    Messenger().post(message);
  });

  Template.login.events({
    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err) {
          console.log(err);
        }
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed.
        //else
          // The user has been logged in.
      });
         return false;
      }
  });
}

if (Meteor.isServer) {
  chatStream.permissions.read(function() {
    return true;
  });

  chatStream.permissions.write(function() {
    return true;
  });


  Meteor.startup(function () {
    // code to run on server at startup


    setInterval(function() {
      msg = getMessage();
        Message = {
        message: msg,
        hideAfter: 7
  };
  chatStream.emit('message', msg);
    }, Math.random()*10000);
  });
}

getMessage = function() {
  HTTP.call("GET", "http://www.iheartquotes.com/api/v1/random", function(err, result) {
    if (!err)
      console.log(result.content);
      return result.content;
  });
};
