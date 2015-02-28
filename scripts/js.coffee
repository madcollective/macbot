module.exports = (robot) ->

  # https://regex101.com/r/kD1iK4/2
  robot.respond /js\s(.+)/i, (msg) ->
    res = eval msg.match[1]
    if (res?)
      msg.send res + ' '

