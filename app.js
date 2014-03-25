Router.map(function(){
  this.route('dashboard', {path: '/'});
  this.route('host');
  this.route('reports');
  this.route('admin');
  this.route('login');
  this.route('logout');
});

messageStream = new Meteor.Stream('message');

if (Meteor.isClient) {
  messageStream.on('message', function(message) {
    Messenger().post(message);
  });
}

if (Meteor.isServer) {

  /*messageStream.permissions.read(function() {
      return true;
  });

  messageStream.permissions.write(function() {
    return true;
  });*/

  Meteor.startup(function () {
    Meteor.setInterval(function() {

      var hosts = Meteor.settings.public.hosts;

      hosts.forEach(function(host) {
        var mem = Meteor.call('getMem', {"linuxDashURL" : host.linuxDashURL});
        var loadavg = Meteor.call('getLoadavg', {"linuxDashURL" : host.linuxDashURL});
        messageStream.emit('message', 'Memory : ' + mem[1]);
        messageStream.emit('message', 'Load : ' + loadavg[1][0]);

        Pings.insert({
          id: host.id,
          mem: mem,
          loadavg: loadavg,
          timestamp: new Date().getTime()
        });

      });

    }, 10000);
  });
}
