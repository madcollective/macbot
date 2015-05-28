# Description:
#   For keeping troublemakers in line.

module.exports = (robot) ->
  robot.hear /playground rule/i, (msg) ->
    msg.send [
        "1. Do good work",
        "2. Be dependable",
        "3. Act with integrity",
        "4. Be positive",
        "5. Play well with others",
        "6. Have fun"
    ].join "\n"
