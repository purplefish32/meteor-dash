messageStream = new Meteor.Stream('message');

// Router.configure({
//     layoutTemplate: 'layout',
//     loadingTemplate: 'loading',
//     waitOn: function() {
//         return [Meteor.subscribe('pings')];
//     }

// });

Router.map(function(){
  this.route('dashboard', {path: '/'});
  this.route('host');
  this.route('reports');
  this.route('admin');
  this.route('login');
  this.route('logout');
  this.route('post', {
    where: 'server',
    action: function() {
      body = this.request.body;
      console.log(body);
      server = body.server;
      platform = body.platform;
      // console.log("Server ID : " + server.id);
      // console.log("Server Hostnamt: " + server.localhostname);
      // console.log("Server Up Time : " + server.uptime);
      // console.log("Platform Name : " + platform.name);
      // console.log("Platform Release : " + platform.release);
      // console.log("Platform Version : " + platform.version);
      // console.log("Platform Machine : " + platform.machine);
      // console.log("Platform CPU : " + platform.cpu);
      // console.log("Platform Memory : " + platform.memory);
      //
      console.log('hi\n');

      //if not find id in hosts, add id to hosts
      var id = Hosts.findOne({id: server.id});

      if(!id){
        Hosts.insert({
          id: server.id
        });
      }

      Pings.insert({
          id: server.id,
          servername: server.localhostname,
          uptime: server.uptime,
          mem: platform.memory,
          cpu: platform.cpu,
          timestamp: new Date().getTime()
      });


      //messageStream.emit('message', JSON.stringify(server));
    }
  });
  this.route('notfound', {path: '*'});
});

//Router.onBeforeAction('loading');

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
    /*Meteor.setInterval(function() {

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

    }, 10000);*/
  });
}
