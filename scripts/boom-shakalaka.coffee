module.exports = (robot) ->
  robot.hear /boom/i, (msg) ->
    msg.send "Shakalaka"
