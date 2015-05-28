# Description:
#   Good ideas, bad ideas, and everything in-between.

module.exports = (robot) ->

  robot.hear /good idea/i, (msg) ->
    good_idea = [
      "Anticipating needs of teammates",
      "Giving status reports before being asked :star2: :star2: :star2:",
      "Listening openly not just planning your reply - yes+1",
      "Meetings: listen to client 90% talk10% sleep 5%",
      "Meetings: start w/ agenda; focus + listen",
      "Meetings: write up minutes + action items",
      "Thinking / Writing / talking with the client / customer / user in mind"
    ]
    msg.send msg.random good_idea

  robot.hear /bad idea/i, (msg) ->
    bad_idea = [
      "FUSSING DRiNKS",
      "Talking to bots"
      "Going to bed w/ shoes on",
      "Putting on hand lotion before trying to clip your toenails",
    ]
    msg.send msg.random bad_idea
