Template.host.hosts = function() {
    var hosts = Meteor.settings.public.hosts;

    hosts.forEach(function(host) {
        host.pings = Pings.find({"id" : host.id}, {sort: {timestamp : -1}, limit: 1 });
    });

    return hosts;
};
