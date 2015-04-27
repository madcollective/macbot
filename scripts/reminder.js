module.exports = function(robot) {
  robot.hear(/reminder/i, function(msg) {
    msg.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });
}
