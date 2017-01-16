// Description:
//   Posts the weekly standup link every Monday at 10am.

var CronJob = require('cron').CronJob;

module.exports = function (robot) {
  var timeConfig = {
    time: "9:55",
    day: "Monday",
    timezone: "America/Los_Angeles"
  };

  var messageData = {
    "channel": '#_abovethefold',
    "text": "5 minute warning! MAC Monday Morning Projects Meeting (MMMPM) is about to start. A link to the call will be posted shortly.",
    "attachments": [
      {
        "fallback": "Required plain-text summary of the attachment.",
        "color": "#00c2ee",
        "title": "Get excited!",
        "image_url": "https://www.madcollective.com/media/dancing-banana.gif",
        "ts": Date.now()
      }
    ]
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

  var day = days.indexOf(timeConfig.day.toLowerCase());
  var time = timeConfig.time.split(":");
  var cronTime = [time[1], time[0], "*", "*", day].join(" ");

  function sendMessage() {
    robot.messageRoom(messageData.channel, messageData);
  }

  new CronJob(cronTime, sendMessage, null, true, timeConfig.timezone);

  robot.hear(/macbot, did you forget something?/i, sendMessage);
};
