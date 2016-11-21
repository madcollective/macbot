// Description:
//   Posts the weekly standup link every Monday at 10am.

var CronJob = require('cron').CronJob;

module.exports = function (robot) {
  var config = {
    room: '#_abovethefold',
    msg: "Hey ya'll, here's the link for the MAC projects weekly team meeting that starts in 15 minutes.",
    link:  "https://appear.in/madcollective",
    time: "9:45",
    day: "Monday",
    timezone: "America/Los_Angeles"
  };

  var days = [
    "sun",
    "mon",
    "tues",
    "wednes",
    "thurs",
    "fri",
    "satur"
  ]
  .map(function (x) {
    return x + "day";
  });

  var day = days.indexOf(config.day.toLowerCase());
  var time = config.time.split(":");
  var message = ["<!channel>", config.msg, config.link].join(" ");
  var cronTime = [time[1], time[0], "*", "*", day].join(" ");

  new CronJob(cronTime, function() {
    robot.messageRoom(config.room, message);
  }, null, true, config.timezone);

  robot.hear(/macbot, did you forget something?/i, function(msg) {
    robot.messageRoom(config.room, message);
  });
};
