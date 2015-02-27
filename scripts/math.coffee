module.exports = (robot) ->

  # https://regex101.com/r/kD1iK4/2
  robot.respond /(\d+)\s?(\+|-|\*|\/)\s?(\d+)/i, (msg) ->
    # grab our operator
    operator = msg.match[2]

    # grab our numbers as strings
    numbers = [
      msg.match[1]
      msg.match[3]
    ]

    # convert strings to base-10 integers
    numbers.forEach (number, numberIndex) ->
      numbers[numberIndex] = parseInt(number, 10)

    # check our operator
    switch operator
      when '+'
        res = numbers[0] + numbers[1]
      when '-'
        res =  numbers[0] - numbers[1]
      when '*'
        res =  numbers[0] * numbers[1]
      when '/'
        res =  numbers[0] / numbers[1]


    # weird hack to make our message send
    msg.send res + ' '
