# Description:
#   Never leaves you hanging.

module.exports = (robot) ->

  robot.hear /:raised_hand:/i, (msg) ->
    msg.send ":pray:"
