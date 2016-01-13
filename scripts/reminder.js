// Description:
//   Posts the weekly standup link every Monday at 10am.

var CronJob = require('cron').CronJob;

module.exports = function (robot) {
  var config = {
    room: '#_abovethefold',
    msg: "<!channel> Hey ya'll, here's the link for the MAC projects weekly team meeting that starts in 15 minutes. https://conflict-test",
    cronTime: '45 9 * * 1'
  };

  new CronJob(config.cronTime, function() {
    robot.messageRoom(config.room, config.msg);
  }, null, true, 'America/Los_Angeles');

};
