var CronJob = require('cron').CronJob;

module.exports = function (robot) {
  var config = {
    room: '#_abovethefold',
    msg: "@channel Hey ya'll, here's the link for the MAC projects weekly team meeting that starts in 15 minutes. https://hangoutsapi.talkgadget.google.com/hangouts/_/gv2qg7ppm4grwujmfbvrm2iflya",
    cronTime: '45 9 * * 1'
  };

  new CronJob(config.cronTime, function() {
    robot.messageRoom(config.room, config.msg);
  }, null, true, 'America/Los_Angeles');

};
