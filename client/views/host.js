Template.host.hosts = function() {
    var hosts = Hosts.find();

    hosts.forEach(function(host) {
        console.log("host\n");

        //ID : bf87f1ad2bc58ddf941c45095c6c3135
        // TODO timestamp
        //host.pings = Pings.find({id: host.id}, {sort: {timestamp : -1}, limit: 1 });
        host.pings = Pings.find({id: host.id}).limit(1);
        console.log(host.pings);
    });

    return hosts;
};
