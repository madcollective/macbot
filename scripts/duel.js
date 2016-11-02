// Description:
//   Remembers something to be recalled later

var STATUS_NOT_DUELING = 0;
var STATUS_CHALLENGE_SENT = 1;
var STATUS_DUELING = 2;

var effects = {
	'fire': {
		adjective: 'on fire'
	},
	'water': {
		adjective: 'soaking wet'
	},
	'cold': {
		adjective: 'cold'
	},
	'frost': {
		adjective: 'frozen'
	},
	'levitation': {
		adjective: 'floating in the air'
	},
	'frog-vomitting': {
		adjective: 'vomitting frogs',
		modifier: function(playerState) {
			playerState.turnSpellcasting *= 0.75;
		}
	},
};

var spells = [
	{
		incantation: 'volito',
		description: 'levitates',
		cast: function(robot, playerState, opponentName, onSelf) {

		}
	},
	{
		incantation: 'madefio',
		isAttack: true,
		description: 'soaks with water',
		cast: function(robot, playerState, opponentName, onSelf) {

		}
	}
	// Chaotic spells that are random
];

module.exports = function (robot) {

	function getDuelKey(challenger, challengee) {
		return 'duel-status:' + challenger + '-' + challengee;
	}

	function getDuelStatus(challenger, challengee) {
		return robot.brain.get(getDuelKey(challenger, challengee));
	}

	function setDuelStatus(challenger, challengee, status) {
		robot.brain.set(getDuelKey(challenger, challengee), status);
	}

	function getPlayerStateKey(name) {
		return name + '.duel-info';
	}

	function getPlayerState(name) {
		return robot.brain.get(getPlayerStateKey(name));
	}

	function setPlayerState(name, state) {
		robot.brain.set(getPlayerStateKey(name), state);
	}

	function getTurnKey(challenger, challengee) {
		return 'duel-turn:' + challenger + '-' + challengee;
	}

	function startPassiveTurn(player, challenger, challengee) {
		robot.brain.set(getTurnKey(challenger, challengee), {
			player: player,
			passive: true
		});
	}

	function startAttackTurn(player, challenger, challengee) {
		robot.brain.set(getTurnKey(challenger, challengee), {
			player: player,
			attack: true
		});
	}

	function getCurrentTurn(challenger, challengee) {
		return robot.brain.get(getTurnKey(challenger, challengee));
	}

	function isDueling(user) {
		return robot.brain.get(getPlayerStateKey(user));
	}

	function duelEnded(challenger, challengee, results) {
		robot.brain.set(getPlayerStateKey(challenger), STATUS_NOT_DUELING);
		robot.brain.set(getPlayerStateKey(challengee), STATUS_NOT_DUELING);

		// TODO: talk about results
	}

	function setInitialPlayerState(name, isChallenger, opponent) {
		setPlayerState(name, {
			name: name,
			isChallenger: isChallenger,
			opponent: opponent,
			health: 100,
			effects: []
		});
	}

	function registerSpell(robot, spell) {
		var regex = new RegExp('^' + spell.incantation + '(\\sself)?!', 'i');

		robot.hear(regex, function(msg) {
			var onSelf = msg.match[1];
			var currentUsername = msg.message.user.name;
			var playerState = getPlayerState(currentUsername);

			if (!playerState) {
				msg.reply('Practice makes perfect.');
				return;
			}
			else {
				var challenger;
				var challengee;

				if (playerState.isChallenger) {
					challenger = playerState.name;
					challengee = playerState.opponent;
				}
				else {
					challenger = playerState.opponent;
					challengee = playerState.name;
				}

				var turn = getCurrentTurn(challenger, challengee);
				if (turn.player == playerState.name) {
					// Determine what the next turn will be depending on what type
					//   of spell this was and what turn it is.
					if (!onSelf && !turn.attack) {
						// They skipped the passive part of their turn
						msg.send('@' + playerState.name + ' skipped his passive turn and went right to the attack!');
						// Go straight to the beginning of the opponent's turn
						startPassiveTurn(playerState.opponent, challenger, challengee);
					}
					else {
						// The player just used the passive part of his turn.  Go to his attack
						startAttackTurn(playerState.name, challenger, challengee);
					}

					// Attempt to perform the spell
					var succeeded = getSpellSuccess(playerState, spell);
					if (succeeded)
						spell.cast(robot, playerState, opponentName, onSelf);
					else if (spell.failure)
						spell.failure(robot, playerState, opponentName, onSelf);
					else
						msg.send('@' + playerState.name + ' fails to cast ' + spell.incantation + '.');
				}
				else {
					msg.reply('It is not your turn.');
				}
			}
		});
	}

	// Register the spell listeners
	for (var i = 0; i < spells.length; i++) {
		registerSpell(robot, spells[i]);
	}


	robot.hear(/I challenge (@\w+) to a wizard'?s'? duel!/i, function(msg) {
		var challengee = msg.match[1].substring(1);
		var challenger = msg.message.user.name;

		// Set the status
		setDuelStatus(challenger, challengee, STATUS_CHALLENGE_SENT);

		msg.send([
			'@' + challenger + ' challenges @' + challengee + ' to a duel!  Does ' + challengee + ' accept?',
			'Type "accepts @' + challenger + '\'s challenge!" to accept.'
		].join('\n'));
	});

	robot.hear(/I accept (@\w+)'s challenge/i, function(msg) {
		var challenger = msg.match[1].substring(1);
		var challengee = msg.message.user.name;

		if (getDuelStatus(challenger, challengee) === STATUS_CHALLENGE_SENT) {
			setInitialPlayerState(challenger, true,  challengee);
			setInitialPlayerState(challengee, false, challenger);
			setDuelStatus(challenger, challengee, STATUS_DUELING);

			var startingPlayer = msg.random(challenger, challengee);
			startAttackTurn(startingPlayer, challenger, challengee);

			msg.send([
				'Hear ye! Hear ye! A duel shall now commence between @' + challenger +' and @' + challengee + '!',
				'@' + startingPlayer + ', thou hast won the coin toss and mayst begin first with an attack.',
				'Whosoever requireth the list of rules shouldst only type "dueling rules".'
			].join('\n'));
		}
		else {
			msg.reply('@' + challenger + ' did not challenge you.');
		}
	});

};
