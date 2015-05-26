var CronJob = require('cron').CronJob;

module.exports = function (robot) {
  var config = {
<<<<<<< HEAD
    room: '#_abovethefold',
    msg: "@channel Hey ya'll, here's the link for the process meeting that starts in 15 minutes. https://hangoutsapi.talkgadget.google.com/hangouts/_/gv2qg7ppm4grwujmfbvrm2iflya",
=======
    room: '#_process',
    msg: "<!channel> Hey ya'll, here's the link for the process meeting that starts in 15 minutes. https://hangoutsapi.talkgadget.google.com/hangouts/_/gv2qg7ppm4grwujmfbvrm2iflya",
>>>>>>> e32dc39dba958066cedf99aa3b77036b51b2f593
    cronTime: '45 9 * * 1'
  };

  new CronJob(config.cronTime, function() {
    robot.messageRoom(config.room, config.msg);
  }, null, true, 'America/Los_Angeles');

};
