module.exports = (robot) ->
  robot.respond /version$/i, (msg) ->
    msg.send "v0.0.0"
