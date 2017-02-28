function initGoals(seed) {
	// putting valid tags in an array so I don't verify I didn't typo a tag and mess up the synergy
	validTags = [
		
		// Stage tags
		"bob", "need_bob",
		"ccm", "need_ccm",
		"wf",  "need_wf",
		"jrb", "need_jrb",
		"bbh", "need_bbh",
		"ssl", "need_ssl",
		"lll", "need_lll", "lll100",
		"hmc", "need_hmc",
		"ddd", "need_ddd",
		"wdw", "need_wdw",
		"thi", "need_thi",
		"ttm", "need_ttm",
		"sl",  "need_sl",
		"rr",  "need_rr",
		"ttc", "need_ttc",
		
		"bitdwreds",
		"bitfsreds",
		"bitsreds",
		
		"wingcap",
		"metalcap",
		"vanishcap",

		"peachslide",
		"aquarium",
		"wmotr",
		
		"secrets",    // secret stars
		
		"die",        // things that cause you to die often
		"live",       // needing a high # of lives at the end
		
		"signs",      // read signs
		
		"nosynergy",  // pretty much a flat overhead... doesn't synergize with anything
		
		"oneoff",     // things that only require you to do one thing in a level one time
		
		// Specific goal tags
		"slides",
		"spinykill",
		"breakdancekill",
		"swimanimation",
		"purpleswitches",
		"uselesscaps",
		"blueswitches",
		"opencannons",
		"usecannons",
		"endwithcoins",
		"bitsallcoins"
	];

	// CTRL-F 'dagger' to copy this, the unicode dagger -> \u2020
	// NOTE: Difficulty may be a bit of a misnomer... it is more of a measure of how long it will take
	// a decent player than it is of how hard it is.
	// One difficulty point = roughly 15 seconds
	possibleGoals = [
		{
			description: "Collect all 5 coins from all 5 BoB poles, and pound them into the ground (*)",
			difficulty: 5,
			tags: ["need_bob", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Shoot out of all 6 cannons in BoB (*)",
			difficulty: 10,
			tags: ["need_bob", "oneoff", "usecannons"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect Big Bob-omb on the Summit without pressing A",
			difficulty: 7,
			tags: ["need_bob", "oneoff"],
			tooltip: "You may press A to select the star on the star screen, but you may NOT hold this A press and use it as a \"half\" A press"
		},

		{
			description: "Die to all 4 minibosses",
			difficulty: 16,
			tags: ["need_bob", "need_wf", "need_ssl", "need_thi", "die"],
			tooltip: "They must deal the killing blow that depletes your health to 0. Eyerok pushing you off the level does NOT count."
		},

		{
			description: "Read all 13 tutorial signs in BoB (*)",
			difficulty: 7,
			tags: ["need_bob", "signs", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect (or re-collect) all 7 stars in BoB while wearing the wing cap",
			difficulty: 30,
			tags: ["need_bob", "wingcap"],
			tooltip: "\"Re-collect\" means collecting a star when it is blue. This will likely be required for at least 1 star."
		},

		{
			description: "Shoot the cannon into the cage in WF and collect the star",
			difficulty: 2,
			tags: ["need_wf", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect 2 stars while wearing the metal cap in WF",
			difficulty: 12,
			tags: ["need_wf", "metalcap"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Read all 8 tutorial signs in WF (*)",
			difficulty: 5,
			tags: ["need_wf", "signs", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Get hit by all 5 clams in JRB and collect what is inside them (*)",
			difficulty: 4,
			tags: ["need_jrb", "oneoff"],
			tooltip: "You may collect what is inside the clam WHILE you are getting hit by it."
		},

		{
			description: "Knock over all 7 pillars in JRB cave without taking damage. Then collect a star that is NOT \"Treasure in the Ocean Cave\"",
			difficulty: 6,
			tags: ["need_jrb", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Fall or jump off the ships in both JRB and RR; (*) after each (\u2020)",
			difficulty: 13,
			tags: ["need_jrb", "need_rr"],
			tooltip: "Jumping to the connected platform or plank in RR does not count. Shooting the cannon does not count."
		},
		
		{
			description: "Read all 5 tutorial signs in JRB (*)",
			difficulty: 6,
			tags: ["need_jrb", "signs", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect two different stars while wearing the metal cap in JRB",
			difficulty: 16,
			tags: ["need_jrb", "metalcap"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect the red coin star in CCM with 0 or 1 A presses (\u2020)",
			difficulty: 6,
			tags: ["need_ccm", "oneoff"],
			tooltip: "Hint: You will almost certainly need 1 A press. Use it wisely."
		},


		{
			description: "Drop both baby penguins in CCM and both monkeys in TTM off the edge of the stage; (*) after each (\u2020)",
			difficulty: 8,
			tags: ["need_ccm", "need_ttm"],
			tooltip: "You must drop both of them in the same life that you collect the star."
		},


		{
			description: "Read all 7 tutorial signs in CCM (*)",
			difficulty: 6,
			tags: ["need_ccm", "signs", "oneoff"],
			tooltip: "No extra explanation"
		},


		{
			description: "Collect 3 stars in CCM while carrying a penguin",
			difficulty: 7,
			tags: ["need_ccm"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect Secret of the Haunted Books in BBH the intended way (book puzzle)",
			difficulty: 1,
			tags: ["need_bbh", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Kill all 11 small boos in BBH (*)",
			difficulty: 12,
			tags: ["need_bbh"],  // note: not oneoff because it requires going on a ghost hunt, THEN re-entering and killing all 11
			tooltip: "No extra explanation"
		},


		{
			description: "Defeat all 3 big boos in BBH using only jump kicks to attack (*)",
			difficulty: 20,
			tags: ["need_bbh"],
			tooltip: "No extra explanation"
		},


		{
			description: "Get covered by all 3 tox-boxes in SSL, while Mario is in his sleeping animation (\u2020)",
			difficulty: 12,
			tags: ["need_ssl", "oneoff"],
			tooltip: "As soon as the camera changes, you are considered to be \"in the sleeping animation\". Does not need to be the laying down sleeping animation."
		},


		{
			description: "Collect Inside the Ancient Pyramid without entering from the top of the pyramid",
			difficulty: 5,
			tags: ["need_ssl", "oneoff"],
			tooltip: "No extra explanation"
		},


		{
			description: "Read all 5 tutorial signs in SSL (*)",
			difficulty: 5,
			tags: ["need_ssl", "signs", "oneoff"],
			tooltip: "No extra explanation"
		},


		{
			description: "Kill all enemies in LLL (*) (\u2020)",
			difficulty: 10,
			tags: ["need_lll", "oneoff", "lll100"],
			tooltip: "10 small bullies, 2 big bullies, 2 Mr. I's.\n2 of the small bullies are inside the volcano."
		},


		{
			description: "Get knocked into lava by 5 different bullies in LLL (*)",
			difficulty: 4,
			tags: ["need_lll", "oneoff"],
			tooltip: "No extra explanation"
		},


		{
			description: "Collect all 23 coins inside the volcano in LLL (*)",
			difficulty: 6,
			tags: ["need_lll", "oneoff", "lll100"],
			tooltip: "No extra explanation"
		},
		

		{
			description: "Kill all 11 bats in HMC (*)",
			difficulty: 12,
			tags: ["need_hmc", "oneoff"],
			tooltip: "No extra explanation"
		},


		{
			description: "Break all 5 cork boxes in HMC (*)",
			difficulty: 5,
			tags: ["need_hmc", "oneoff"],
			tooltip: "No extra explanation"
		},
		


		{
			description: "Get ejected from the metal cap stage waterfall",
			difficulty: 8,
			tags: ["need_hmc", "metalcap", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Complete 2 laps around the HMC island while riding Dorrie the dinosaur's head (*)",
			difficulty: 7,
			tags: ["need_hmc", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Get ejected from the black pit in DDD",
			difficulty: 6,
			tags: ["need_ddd", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect the 8 red coin star in DDD when the sub is absent",
			difficulty: 12,
			tags: ["need_ddd", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Touch all 7 \"water diamonds\" in WDW (*)",
			difficulty: 8,
			tags: ["need_wdw", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Collect all 10 coins from small goombas in THI (*)",
			difficulty: 7,
			tags: ["need_thi", "oneoff"],
			tooltip: "If you kill a goomba without spawning his coin (or fail to collect a coin), you can't complete this task without re-entering the level."
		},

		{
			description: "Get eaten by both Bubbas (fish) in THI",
			difficulty: 6,
			tags: ["need_thi", "die"],
			tooltip: "No extra explanation"
		},

		{
			description: "Ground pound the pole in the middle island of THI into the ground (*)",
			difficulty: 5,
			tags: ["need_thi", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Touch all 12 mushrooms in TTM (*)",
			difficulty: 5,
			tags: ["need_ttm", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect Blast to the Lonely Mushroom in TTM with the cannon",
			difficulty: 6,
			tags: ["need_ttm", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Talk to the penguin in SL and cross the ice bridge with him escorting you",
			difficulty: 5,
			tags: ["need_sl", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Get Stomp on the Thwomp in TTC with random time (clock hand on \"6\")",
			difficulty: 6,
			tags: ["ttc", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect Cruiser Crossing the Rainbow and 8 red coins in RR without wallkicking",
			difficulty: 11,
			tags: ["need_rr"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Get all 80 coins in BitS",
			difficulty: 15,
			tags: ["bitsreds", "bitsallcoins", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Do Bowser throws in the opposite direction you normally do",
			difficulty: 6,
			tags: ["nosynergy"],
			tooltip: "Honor system people...\nThrows that require <1 full revolution can be either direction"
		},
		
		{
			description: "Collect all 80 coins on the Peach slide",
			difficulty: 2,
			tags: ["peachslide", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Fall off the level in Wing Mario Over the Rainbow (cloud stage)",
			difficulty: 4,
			tags: ["wmotr", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect all the coins on all 3 slides. Peach (80), CCM (77), TTM (62)",
			difficulty: 10,
			tags: ["slides", "need_ccm", "need_ttm"],
			tooltip: "Peach Slide - 80 coins\nCCM Slide - 77 coins\nTTM Slide - 62 coins (be observant!)\nNote: Collecting stars is not required"
		},
		
		{
			description: "Collect all 4 lives and all 27 coins in the Vanish Cap stage (*)",
			difficulty: 9,
			tags: ["vanishcap", "oneoff", "secrets"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Break all 6 wingcap boxes in cloud stage (WMotR) (*)",
			difficulty: 7,
			tags: ["wmotr", "wingcap", "secrets", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect all 47 coins in the Metal Cap stage (*)",
			difficulty: 7,
			tags: ["need_hmc", "metalcap", "secrets", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect all 56 coins in the Secret Aquarium",
			difficulty: 6,
			tags: ["secrets", "aquarium", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect the Secret Aquarium star with only one A press",
			difficulty: 6,
			tags: ["secrets", "aquarium", "oneoff"],
			tooltip: "One Half-A press would alse be accepted, TJ \"Henry\" Yoshi."
		},
		
		{
			description: "Kill all 10 boos in the castle courtyard",
			difficulty: 4,
			tags: ["bbh", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "BLJ warp into WDW from the endless staircase",
			difficulty: 4,
			tags: ["need_wdw", "oneoff"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "End the game with a prime number of stars",
			difficulty: 7,
			tags: ["nosynergy"],
			tooltip: "17, 19, 23, 29, 31, 37, 41, etc..."
		},

		{
			description: "End the game with exactly 4 lives and 20 coins",
			difficulty: 6,
			tags: ["die", "endwithcoins"],  // die because you will usually have > 4 lives
			tooltip: "lol"
		},
		
		{
			description: "Collect 5 stars with names starting with B",
			difficulty: 2,
			tags: ["bob", "wf", "jrb", "ccm", "bbh", "lll", "ddd", "ttm"],
			tooltip: "Official star select screen names. Secret stars don't count.\nHINT:\nBoB: 2\nWF: 1\nJRB: 1\nCCM: 1\nBBH: 1\nLLL: 2\nDDD: 1\nTTM: 2"
		},
		
		{
			description: "Collect 5 stars with names starting with S",
			difficulty: 4,
			tags: ["wf", "ccm", "bbh", "hmc", "ssl", "wdw", "ttm", "ttc", "rr"],
			tooltip: "Official star select screen names. Secret stars don't count.\nHINT:\nWF: 1\nCCM: 2\nBBH: 2\nHMC: 1\nSSL: 2\nWDW: 2\nTTM: 2\nTTC: 2\nRR: 2"
		},
		
		{
			description: "Collect 5 stars with names starting with a vowel (A, E, I, O, U)",
			difficulty: 4,
			tags: ["bbh", "hmc", "lll", "ssl", "wdw"],
			tooltip: "Official star select screen names. Secret stars don't count. 100 coin star doesn't count. Numbers (such as \"8\" don't count).\nHINT:\nBBH: 1\nHMC: 2\nLLL: 1\nSSL: 2\nWDW: 1"
		},
		
		{
			description: "Trigger 4 \"star spawn\" animations in a single visit to a level, and collect a DIFFERENT star",
			difficulty: 9,
			tags: ["bob", "ccm", "jrb", "bbh", "ssl", "lll", "ddd", "wdw", "thi", "sl", "oneoff"],
			tooltip: "Any star that starts off obtainable in the level without triggering a \"star spawn\" animation does not count towards the 4. If you triggered 5 spawns, you may collect any of them as your \"different\" star."
		},
		
		{
			description: "Collect 2 stars in different stages while having exactly 99 coins",
			difficulty: 9,
			tags: ["nosynergy"],
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect 6 different caps from boxes, but don't use them for anything (\u2020)",
			difficulty: 18,
			tags: ["wingcap", "metalcap", "vanishcap", "secrets", "uselesscaps"],
			tooltip: "Spawning with a cap in a cap stage doesn't count towards the 10. You may not fly, walk through walls/enemies, walk/sink underwater, or use metalcap invincibility. You MAY collect a star wearing the cap as long as you don't USE the cap for anything."
		},

		{
			description: "Collect 10 different caps from boxes, but don't use them for anything (\u2020)",
			difficulty: 30,
			tags: ["wingcap", "metalcap", "vanishcap", "secrets", "uselesscaps"],
			tooltip: "Spawning with a cap in a cap stage doesn't count towards the 10. You may not fly, walk through walls/enemies, walk/sink underwater, or use metalcap invincibility. You MAY collect a star wearing the cap as long as you don't USE the cap for anything."
		},		
		
		{
			description: "Take 7 warps (no repeats) (\u2020)",
			difficulty: 10,
			tags: ["bob", "wf", "ccm", "lll", "ssl", "wdw", "ttm", "thi"],
			tooltip: "Taking the same warp both directions only counts as 1."
		},
		
		{
			description: "No ledge grabs (\u2020)",
			difficulty: 15,
			tags: ["nosynergy"],
			tooltip: "If you ledge grab you must die or exit the stage through the start menu; If you are outside a level you must die before continuing"
		},

		{
			description: "Experience death by fire, drowning, and electrecution",
			difficulty: 10,
			tags: ["die", "wdw"],
			tooltip: "No extra explanation"
		},

		{
			description: "Lose and recover Mario's hat in SL, SSL, and TTM; (*) after each",
			difficulty: 12,
			tags: ["need_sl", "need_ssl", "need_ttm"],
			tooltip: "No extra explanation"
		},

		{
			description: "Roll both logs to the opposite end in LLL and TTM; (*) after each",
			difficulty: 6,
			tags: ["need_lll", "need_ttm"],
			tooltip: "No extra explanation"
		},

		{
			description: "Get thrown by all 5 Chuckyas; (*) after each",
			difficulty: 24,
			tags: ["need_wdw", "need_thi", "need_ttm", "need_rr", "bitsreds"],
			tooltip: "For BitS, you must collect the red coin star"
		},

		{
			description: "Kill 15 different enemies with Mario's stationary \"breakdance\" (Z+B) (\u2020)",
			difficulty: 6,
			tags: ["breakdancekill"],
			tooltip: "You may kill multiple of an enemy type (e.g., goombas), but you may not kill an enemy, then respawn it, then kill it again"
		},
		

		{
			description: "Kill 25 different enemies with Mario's stationary \"breakdance\" (Z+B) (\u2020)",
			difficulty: 10,
			tags: ["breakdancekill"],
			tooltip: "You may kill multiple of an enemy type (e.g., goombas), but you may not kill an enemy, then respawn it, then kill it again"
		},

		{
			description: "Destroy all 5 crazy-boxes and collect every resulting coin; (*) after each (\u2020)",
			difficulty: 11,
			tags: ["need_ssl", "need_lll", "need_bbh", "need_ttm"],
			tooltip: "You can destroy multiple crazy boxes in one level and then only need to collect 1 star afterwards"
		},

		{
			description: "Collect both of the coins outside the castle; Collect the resulting 1-up",
			difficulty: 12,
			tags: ["vanishcap", "oneoff"],
			tooltip: "No extra explanation"
		},

		{
			description: "Get tossed by all 4 heave-hos; (*) after each (\u2020)",
			difficulty: 6,
			tags: ["need_wdw", "ttc"],
			tooltip: "You can get tossed by multiple heave-hos in one level and then only need to collect 1 star afterwards"
		},

		{
			description: "Press 4 different purple ! switches in non-Bowser stages; (*) after each",
			difficulty: 8,
			tags: ["bob", "hmc", "ddd", "wdw", "thi", "rr", "purpleswitches"],
			tooltip: "No extra explanation"
		},

		{
			description: "Press 6 different purple ! switches in non-Bowser stages; (*) after each",
			difficulty: 13,
			tags: ["bob", "hmc", "ddd", "wdw", "thi", "rr", "purpleswitches"],
			tooltip: "No extra explanation"
		},

		{
			description: "Complete BitDW stage with your controller up-side down (can do throws right-side up)",
			difficulty: 5,
			tags: ["nosynergy"],
			tooltip: "No extra explanation"
		},

		{
			description: "Kill all 4 Spiny's in SSL; You may only attack them with breakdance (stationary Z+B). You may not replenish any health until all 4 are dead (\u2020)",
			difficulty: 8,
			tags: ["need_ssl", "spinykill", "oneoff"],
			tooltip: "If you accidentally attack some other way, you may wait for the spiny to fully regenerate its body and attack him again. If you accidentally kill one without breakdancing, you must re-enter the level and try again. If you are hurt and you collect a coin or heal in water you must re-enter the level."
		},

		{
			description: "LLL 100 coin star without using shell",
			difficulty: 14,
			tags: ["need_lll", "oneoff", "lll100"],
			tooltip: "No extra explanation"
		},

		{
			description: "Enter every stage, sub-stage, and secret stage in the game; Collecting stars is not needed (\u2020)",
			difficulty: 30,
			tags: ["nosynergy"],  // such a grand task that it will synergize with EVERYTHING. So not even worth trying to balance w/ synergy tags
			tooltip: "15 stages\nCCM Slide\nAquarium\nJRB ship\nPeach slide\nWing Cap\nSSL Pyramid\nLLL Volcano\nMetal Cap\nVanish Cap\nTHI Big and Small\nTHI Wigglers/reds (same sub-stage)\nTTM slide\nSL igloo\nWMotR"
		},

		{
			description: "Enter the swimming animation in 5 separate stages or secret stages; (*) after each",
			difficulty: 6,
			tags: ["aquarium", "metalcap", "jrb", "ssl", "hmc", "thi", "ttm", "swimanimation"],
			tooltip: "No extra explanation"
		},

		{
			description: "Enter the swimming animation in 7 separate stages or secret stages; (*) after each",
			difficulty: 9,
			tags: ["aquarium", "metalcap", "jrb", "ssl", "hmc", "thi", "ttm", "swimanimation"],
			tooltip: "No extra explanation"
		},

		{
			description: "Press 8 blue coin switches and collect the resulting coins",
			difficulty: 8,
			tags: ["blueswitches", "wf", "jrb", "ccm", "bbh", "hmc", "ssl", "ddd", "wdw", "thi", "ttc", "rr", "peachslide"],
			tooltip: "No extra explanation"
		},

		{
			description: "Press 10 blue coin switches and collect the resulting coins",
			difficulty: 10,
			tags: ["blueswitches", "wf", "jrb", "ccm", "bbh", "hmc", "ssl", "ddd", "wdw", "thi", "ttc", "rr", "peachslide"],
			tooltip: "No extra explanation"
		},

		{
			description: "Press all 12 blue coin switches and collect the resulting coins",
			difficulty: 12,
			tags: ["blueswitches", "need_wf", "need_jrb", "need_ccm", "need_bbh", "need_hmc", "need_ssl", "need_ddd", "need_wdw", "need_thi", "need_ttc", "need_rr", "peachslide"],
			tooltip: "No extra explanation"
		},

		{
			description: "Open 7 cannons",
			difficulty: 10,
			tags: ["opencannons", "bob", "wf", "jrb", "ccm", "ssl", "wdw", "thi", "ttm", "sl", "rr", "wmotr"],
			tooltip: "No extra explanation"
		},

		{
			description: "Open 9 cannons",
			difficulty: 15,
			tags: ["opencannons", "bob", "wf", "jrb", "ccm", "ssl", "wdw", "thi", "ttm", "sl", "rr", "wmotr"],
			tooltip: "No extra explanation"
		},

		{
			description: "Open all 11 cannons",
			difficulty: 20,
			tags: ["opencannons", "need_bob", "need_wf", "need_jrb", "need_ccm", "need_ssl", "need_wdw", "need_thi", "need_ttm", "need_sl", "need_rr", "wmotr"],
			tooltip: "No extra explanation"
		},

		{
			description: "Blow up all 4 bombs in the BitDW bowser fight",
			difficulty: 4,
			tags: ["nosynergy"],
			tooltip: "No extra explanation"
		}
	];

	let maxDifficulty = 1;
	let totalDifficulty = 0;
	
	// Give ID's to goals and calculate max difficulty, average, and std dev
	for (let i = 0; i < possibleGoals.length; i++) {
		let goal = possibleGoals[i];
		
		goal.id = i;

		maxDifficulty = Math.max(maxDifficulty, goal.difficulty);
		totalDifficulty += goal.difficulty;
	}

	averageDifficulty = totalDifficulty / possibleGoals.length;

	// Calculate std dev
	difficultyStdDev = 0;
	for (let i = 0; i < possibleGoals.length; i++) {
		let goal = possibleGoals[i];
		
		difficultyStdDev += Math.pow(goal.difficulty - averageDifficulty, 2);
	}

	difficultyStdDev /= possibleGoals.length;
	difficultyStdDev = Math.sqrt(difficultyStdDev);
	
	// Create random ordering for goals to be selected
	Math.seedrandom(seed);

	for (let i = 0; i < possibleGoals.length; i++) {
		goalOrder[i] = i;
	}
	
	// Shuffle the order
	for (let index = goalOrder.length - 1; index > 0; index--) {
		
		let selectionIndex = Math.floor(Math.random() * index);

		let temp = goalOrder[index];
		goalOrder[index] = goalOrder[selectionIndex];
		goalOrder[selectionIndex] = temp;
	}

	goalsByDifficulty = [];
	
	// Organize goals by difficulty to help the puzzle generator
	// NOTE: these lists are shuffled too
	for (let i = 0; i <= maxDifficulty; i++) {
		goalsByDifficulty.push([]);
	}
	
	for (let i = 0; i < possibleGoals.length; i++) {
		let goal = possibleGoals[goalOrder[i]];
		
		goalsByDifficulty[goal.difficulty].push(goal);
	}


	// verify integrity of goals
	// only enable for development / testing
	if (true) {
		let oneoffCount = 0;
		for(let i = 0; i < possibleGoals.length; i++) {
			let goal = possibleGoals[i];

			assert("description" in goal);
			assert("tags" in goal);
			assert("difficulty" in goal);
			assert("tooltip" in goal);
			
			assert(goal.description !== "");
			assert(goal.tags.length > 0);
			assert(goal.difficulty > 0);
			
			for(let j = 0; j < goal.tags.length; j++) {
				let tag = goal.tags[j];
				assert(validTags.indexOf(tag) !== -1);
				assert(goal.tags.indexOf(tag) === goal.tags.lastIndexOf(tag));  // no duplicate tags

				if (tag === "oneoff") {
					oneoffCount += 1;
				}
			}
		}

		if (false) {
			alert("Total # of goals: " + possibleGoals.length + "\nTotal number of one-off goals: " + oneoffCount + " (" + (oneoffCount / possibleGoals.length * 100).toFixed(2) + "%)");
		}
	}
}
