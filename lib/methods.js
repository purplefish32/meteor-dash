/*
Meteor.methods({
  getMem: function(arg) {
    // Memory
    var mem = Meteor.http.get(arg.linuxDashURL + 'sh/mem.php', {timeout:30000});

    if(mem.statusCode == 200) {
      var respJson = JSON.parse(mem.content);

      if(mem.content) {
        return respJson;
      } else {
        throw new Meteor.Error('error', 'error-text');
      }
    } else {
      console.log("Content issue: ", mem.statusCode);
      throw new Meteor.Error("");
    }
  },

  getLoadavg: function(arg) {
    // Loadavg
    var loadavg = Meteor.http.get(arg.linuxDashURL + 'sh/loadavg.php', {timeout:30000});

    if(loadavg.statusCode == 200) {
      var respJson = JSON.parse(loadavg.content);

      if(loadavg.content) {
        return respJson;
      } else {
        throw new Meteor.Error('error', 'error-text');
      }
    } else {
      console.log("Content issue: ", loadavg.statusCode);
      throw new Meteor.Error("");
    }
  }
});
*/
