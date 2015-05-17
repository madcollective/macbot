module.exports = function (robot) {
  var config = {
    room: 'C04T6B8GN',
    msg: "Hey ya'll, here's the link for the process meeting that starts in 15 minutes. https://hangoutsapi.talkgadget.google.com/hangouts/_/gv2qg7ppm4grwujmfbvrm2iflya",
    interval: 1000 * 2
  };

  var envelope = {
    user: {
      type: config.type || 'groupchat'
    }
  };

  if (config.room) {
    envelope.user.room = envelope.room = config.room;
  }

  // setInterval(function () {
    robot.send(envelope, config.msg);
  // }, config.interval);
};
