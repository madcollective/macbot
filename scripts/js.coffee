ent = require "ent"
module.exports = (robot) ->

  # https://regex101.com/r/kD1iK4/2
  robot.respond /js\s([\s\S]+)/i, (msg) ->
    code = ent.decode msg.match[1]
    res = eval code
    if (res?)
      msg.send res + ' '

