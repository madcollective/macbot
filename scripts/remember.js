// Description:
//   Remembers something to be recalled later

module.exports = function (robot) {
  robot.hear(/remember (.*)/i, function(msg) {
    var thing = msg.match[1]
    robot.brain.set('remembered-thing', thing);
    msg.send('Remembering ' + thing);
  });
};
