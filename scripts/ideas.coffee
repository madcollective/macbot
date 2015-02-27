module.exports = (robot) ->

  robot.hear /good idea/i, (msg) ->
    good_idea = ["Thinking / Writing / talking with the client / customer / user in mind", "meetings: start w/ agenda; focus + listen; write up minutes + action items - Yes! - truuuuuuuuuuu","Anticipating needs of teammates - Yay! -> e.g Giving status reports before being asked :star2: :star2: :star2: :star2: :star2:","Listening openly not just planning your reply - yes+1","in meeting listen to client 90% talk10% sleep 5%"]
    msg.send msg.random good_idea

  robot.hear /bad idea/i, (msg) ->
    bad_idea = ["going to bed w/ shoes on", "putting on hand lotion before trying to clip your toenails","FUSSING DRiNKS", "Talking to bots"]
    msg.send msg.random bad_idea
