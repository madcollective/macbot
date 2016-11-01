// Description:
//   Recalls something we were told to remember

module.exports = function (robot) {
  robot.hear(/recall/i, function(msg) {
    var thing = robot.brain.get('remembered-thing', thing);
    if (thing)
      msg.send('' + thing);
  });
};
