module.exports = (robot) ->
  flipWords = [
    'throw',
    'flick',
    'hurl',
    'fling',
    'lob',
    'project',
    'chuck',
    'flip',
    'toss'
  ].join('|');

  coinWords = [
    'coin',
    'penny',
    'nickel',
    'dime',
    'quarter',
    'half\\Wdollar'
  ].join('|');

  coinRegEx = new RegExp "(" + flipWords + ") a (" + coinWords + ")", "i";
  robot.hear coinRegEx, (msg) ->
    coin = ["heads", "tails"]
    msg.send msg.random coin
