# Description:
#   When you say "boom", I say "shakalaka"

module.exports = (robot) ->
  robot.hear /boom/i, (msg) ->
    msg.send "Shakalaka"
