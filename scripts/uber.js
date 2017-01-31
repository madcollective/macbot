// Description:
//   Prints out uberconference information

module.exports = function (robot) {
  robot.hear(/uber/i, function(msg) {
    msg.send('www.uberconference.com/madcollective … or just dial 541.622.3254');
  });
};
