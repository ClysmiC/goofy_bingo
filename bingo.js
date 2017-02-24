var possibleGoals;

function assert(value) {
	if (!value) {
		debugger;
		alert("ASSERTION FAILED. Someone has some debugging to do...");
	}
}

function init() {
	// set cell height to the width
	// width was determined by css
	let minDimension = 600;

	let dimension = Math.max(minDimension, 0.8 * Math.min(window.innerWidth, window.innerHeight));
	let cellDimension = dimension / 5.0;

	$("td").each(function() {
		$(this).width(cellDimension);
		$(this).height(cellDimension);
	});

	// note: id must equal the index in the array.
	possibleGoals = [
		{
			id: 0,
			description: "Collect all 5 coins from all 5 BoB poles, and pound them into the ground",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 1,
			description: "Shoot out of all 6 cannons in BoB and get a star",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 2,
			description: "Enter BoB and then defeat King Bob-Omb without using the A button",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 3,
			description: "Die to all 4 minibosses",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "They must deal the killing blow that depletes your health to 0. Eyerok pushing you off the level does NOT count."
		},

		{
			id: 4,
			description: "Read all tutorial signs in BoB (13)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 5,
			description: "Collect (or re-collect) all 7 stars in BoB while wearing the wing cap",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 6,
			description: "Shoot the cannon into the cage in WF",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 7,
			description: "Collect 2 stars while wearing the metal cap in WF",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 8,
			description: "Read all tutorial signs in WF (8)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 9,
			description: "Get hit by all 5 clams in JRB and collect what is inside them",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 10,
			description: "Knock over all 7 pillars in JRB cave without taking damage",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 11,
			description: "Fall off the ships in both JRB and RR; Collect a star after each",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 12,
			description: "Read all tutorial signs in JRB (5)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 13,
			description: "Collect two stars while wearing metal cap in JRB",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 14,
			description: "Collect the red coin star in CCM with 0 or 1 A presses",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Hint: You will almost certainly need 1 A press. Use it wisely."
		},


		{
			id: 15,
			description: "Drop both baby penguins in CCM and both monkeys in TTM off the edge of the stage",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 16,
			description: "Read all tutorial signs in CCM (7)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 17,
			description: "Collect 3 stars in CCM while carrying a penguin",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 18,
			description: "Collect Secret of the Haunted Books in BBH the intended way (book puzzle)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 19,
			description: "Kill all 11 small boos in BBH",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 20,
			description: "Defeat all 3 big boos in BBH using only jump kicks to attack",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation long text this is very long text hopfully it will wrap around i really hope it will."
		},


		{
			id: 21,
			description: "Get covered by all 3 tox-boxes",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 22,
			description: "Collect Inside the Ancient Pyramid without entering from the top",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 23,
			description: "Read all tutorial signs in SSL (5)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 24,
			description: "Kill all enemies in LLL (10 small bullies, 2 big bullies, 2 Mr. I's)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 25,
			description: "Get knocked into lava by 5 different bullies in one life",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 26,
			description: "Collect all 23 coins inside the volcano",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		

		{
			id: 27,
			description: "Kill all 11 bats in HMC",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			id: 28,
			description: "Break all 6 cork boxes in HMC",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		


		{
			id: 29,
			description: "Get ejected from the HMC waterfall",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 30,
			description: "Complete 2 laps around the HMC island while riding Dorrie the dinosaur's head",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation long text this is very long text hopfully it will wrap around i really hope it will."
		},

		{
			id: 31,
			description: "Read all tutorial signs in HMC (14)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 32,
			description: "Get ejected from the black pit in DDD",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 33,
			description: "Collect 8 red coins in DDD when the sub is absent",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 34,
			description: "Touch all 7 \"water diamonds\" in WDW",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 35,
			description: "Collect all 10 coins from small goombas in THI",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 36,
			description: "Get eaten by both Bubbas (fish) in THI",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 37,
			description: "Ground pound the pole in the middle island of THI into the ground",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 38,
			description: "Touch all 12 mushrooms in TTM",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 39,
			description: "Collect Blast to the Lonely Mushroom in TTM with the cannon",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 40,
			description: "Talk to the penguin in SL and cross the ice bridge with him escorting you",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 41,
			description: "Get Stomp on the Thwomp in TTC with random time (clock hand on \"6\")",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 42,
			description: "Collect Cruiser Crossing the Rainbow and 8 red coins in RR without wallkicking",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 43,
			description: "Get all 80 coins in BitS",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 44,
			description: "Do Bowser throws in the opposite direction you normally do",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Throws that require <1 full revolution can be either direction"
		},
		
		{
			id: 45,
			description: "Collect all 80 coins on the Peach slide",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 46,
			description: "Fall off the level in Wing Mario Over the Rainbow (cloud stage)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 47,
			description: "Collect all the coins on all 3 slides",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Peach Slide - 80 coins\nCCM Slide - 77 coins\nTTM Slide - 47 coins (be observant!)"
		},
		
		{
			id: 48,
			description: "Collect all 4 lives and all 27 coins in the Vanish Cap stage",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 49,
			description: "Break all 6 wingcap boxes in cloud stage",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 50,
			description: "Collect all 47 coins in the Metal Cap stage",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 51,
			description: "Collect all 56 coins in the Secret Aquarium",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 52,
			description: "Collect the Secret Aquarium star with only one A press",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Half-A presses are also accepted, TJ \"Henry\" Yoshi"
		},
		
		{
			id: 53,
			description: "Kill all 10 boos in the courtyard",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 54,
			description: "BLJ warp into WDW from the endless staircase",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 55,
			description: "End the game with a prime number of stars",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "17, 19, 23, 29, 31, 37, 41, etc..."
		},
		
		{
			id: 56,
			description: "End the game with exactly 6 lives and 9 coins",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "lol"
		},

		{
			id: 57,
			description: "End the game with exactly 4 lives and 20 coins",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "lol"
		},
		
		{
			id: 58,
			description: "Collect 5 stars with names starting with F",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			id: 59,
			description: "Collect 5 stars with names starting with F",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			id: 60,
			description: "Collect 5 stars with names starting with B",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			id: 61,
			description: "Collect 5 stars with names starting with S",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			id: 62,
			description: "Collect 5 stars with names starting with a vowel (A, E, I, O, U)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			id: 63,
			description: "Trigger 4 \"star spawn\" animations in a single visit to a level, and collect a star",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Any star that starts off obtainable in the level without triggering a \"star spawn\" animation does not count towards the 4"
		},
		
		{
			id: 64,
			description: "Collect 2 stars while having exactly 99 coins",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			id: 65,
			description: "Collect 10 different caps from boxes, but don't use them for anything",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Spawning with a cap in a cap stage doesn't count towards the 10. You may not fly, walk through walls/enemies, walk/sink underwater, or use metalcap invincibility. You MAY collect a star wearing the cap as long as you don't USE the cap for anything."
		},
		
		{
			id: 66,
			description: "Take 7 warps (no repeats)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Can you take it both ways?"
		},
		
		{
			id: 67,
			description: "No ledge grabs *",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "If you ledge grab you must die or exit the stage through the start menu; If you are outside a level you must die before continuing"
		},

		{
			id: 68,
			description: "No Z button *",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "If you press Z you must die or exit the stage through the start menu; If you are outside a level you must die before continuing"
		},

		{
			id: 69,
			description: "Experience death by fire, drowning, and electrecution",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 70,
			description: "Lose and recover Mario's hat in SL, SSL, and TTM",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 71,
			description: "Roll both logs to the opposite end in LLL and TTM; Collect a star after each",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 72,
			description: "Get thrown by all 5 Chuckyas",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 73,
			description: "Kill 15 different enemies with Mario's stationary \"breakdance\" (Z+B)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "You may kill multiple of an enemy type (e.g., goombas), but you may not kill an enemy, then respawn it, then kill it again"
		},

		{
			id: 74,
			description: "Destroy all 5 crazy-boxes and collect every resulting coin",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 75,
			description: "Collect bouth of the coins outside the castle; Collect the resulting 1-up",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 76,
			description: "Get tossed by all 4 heave-hos",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 77,
			description: "Press 4 different purple ! switches",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			id: 78,
			description: "Complete BitDW with your controller upside down",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
	];

	// verify integrity of all goals
	for(let i = 0; i < possibleGoals.length; i++) {
		let goal = possibleGoals[i];
		
		assert(i === goal.id);
		assert(goal.description !== "");

		// TODO: enable this for release.
		// Non-assigned difficulties are set to -1, but must be assigned
		// before release!
		// assert(goal.difficulty > 0);
	}

	// Initialize each cell
	for(let i = 0; i < 5; i++) {
		for(let j = 0; j < 5; j++) {
			let goal = possibleGoals[i * 5 + j];
			
			let id = i + "_" + j;
			let cell = $("#" + id);

			if(i === 0 && j === 0) {
				goal = possibleGoals[47];
			}
			
			cell.text(goal.description);
			cell.prop("title", goal.tooltip);

			cell.on("click", function() {
				if ($(this).hasClass("greenCell")) {
					$(this).addClass("redCell");
					$(this).removeClass("greenCell");
				}
				else if ($(this).hasClass("redCell")) {
					$(this).removeClass("redCell");
				}
				else {
					$(this).addClass("greenCell");
				}
			});
		}
	}


	// enable qtip for better tooltips
	$('[title!=""]').qtip({
		position: {
			target: 'mouse',
			adjust: {
				mouse: false
			},
		},

		show: { delay: 1000 },
		hide: { when: { event:'mouseout unfocus' }, fixed: true, delay: 100 }
	});
}


init();
