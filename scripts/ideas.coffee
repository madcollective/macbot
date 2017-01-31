# Description:
#   Good ideas, bad ideas, and everything in-between.

module.exports = (robot) ->

  robot.hear /good idea/i, (msg) ->
    good_idea = [
      "Anticipating the needs of your teammates",
      "Giving status reports before being asked :star2: :star2: :star2:",
      "Listening openly, not just planning your reply - yes+1",
      "Meetings - listen 90%, talk 10%",
      "Meetings - start with an agenda",
      "Meetings - write up minutes + action items",
      "Meetings - come prepared",
      "Thinking with the client / customer / user in mind"
    ]
    msg.send('Good idea: ' + msg.random good_idea)

  robot.hear /bad idea/i, (msg) ->
    bad_idea = [
      "FUSSING DRiNKS",
      "Talking to bots"
      "Going to bed w/ shoes on",
      "Putting on hand lotion before trying to clip your toenails",
    ]
    msg.send('Bad idea: ' + msg.random bad_idea)
