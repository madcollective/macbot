module.exports = function (robot) {
  var config = {
    room: '#_macbot-test',
    msg: "Hey ya'll, here's the link for the process meeting that starts in 15 minutes. https://hangoutsapi.talkgadget.google.com/hangouts/_/gv2qg7ppm4grwujmfbvrm2iflya",
    interval: 1000 * 2
  };

  setInterval(function () {
    robot.messageRoom(config.room, config.msg);
  }, config.interval);
};
