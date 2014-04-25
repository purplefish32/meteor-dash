Template.host.hosts = function() {
    var hosts = Hosts.find();

    hosts.forEach(function(host) {
        Hosts.update({_id: host._id}, {$set: {lastPing: Pings.findOne({id: host.id}, {sort: {timestamp : -1}}) }});
    });

    return hosts;
};
