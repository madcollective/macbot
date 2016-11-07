# Description:
#   Responds politely to thank you's

module.exports = (robot) ->
  robot.hear /thanks, macbot|thank you, macbot/i, (msg) ->
    msg.send "Ah, you are _most_ welcome, @#{msg.message.user.name}!"
