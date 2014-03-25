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
    /*chatStream.permissions.read(function() {
        return true;
    });

    chatStream.permissions.write(function() {
        return true;
    });*/


    Meteor.startup(function () {
        // code to run on server at startup

        Meteor.methods({
            getData: function() {
                var url = 'http://88.80.186.29/linux-dash/sh/mem.php';
                var result = Meteor.http.get(url, {timeout:30000});
                if(result.statusCode == 200) {
                    var respJson = JSON.parse(result.content);
                    console.log("response received.");
                    //custom code
                    if(result.content) { //IF OK
                        console.log('returning response');
                        return respJson;
                    } else {
                        throw new Meteor.Error('error', 'error-text');
                    }
                } else {
                    console.log("Content issue: ", result.statusCode);
                    throw new Meteor.Error("");
                }
            }
        });

        Meteor.setInterval(function() {
            data = Meteor.call('getData');

            console.log(data[1]);

            Message = {
                message: data,
                hideAfter: 7
            };

            chatStream.emit('message', data[1]);
        }, Math.random()*1000);
    });
}