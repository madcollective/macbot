module.exports = (robot) ->

  # https://regex101.com/r/kD1iK4/2
  robot.respond /js\s(.+)/i, (msg) ->
    code = decodeURIComponent msg.match[1]
    res = eval code
    if (res?)
      msg.send res + ' '

