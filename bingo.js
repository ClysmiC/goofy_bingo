var possibleGoals;

function assert(value) {
	if (!value) {
		debugger;
		alert("ASSERTION FAILED. Someone has some debugging to do...");
	}
}

function init() {
	let seed;

	// Check URL for random seed. If none exists or invalid, generate one and redirect
	// to the page with the seed as the query param
	if(location.href.includes("?seed=")) {
		let seedIndex = location.href.indexOf("?seed=");
		seedIndex += "?seed=".length;

		seed = parseInt(location.href.slice(seedIndex));
	}
	else {
		let generatedSeed = Date.now();
		location.href = "?seed=" + generatedSeed;  // REDIRECT
	}

	// set cell height to the width
	// width was determined by css
	let minDimension = 400;
	let maxDimension = 800;

	let dimension = 0.7 * Math.min(window.innerWidth, window.innerHeight);
	dimension = Math.max(minDimension, dimension);
	dimension = Math.min(maxDimension, dimension);

	let cellDimension = dimension / 5.0;

	$("td").each(function() {
		$(this).width(cellDimension);
		$(this).height(cellDimension);
	});

	// Adjust right panel so it is aligned properly
	let cardHeight = $("#cardPanel").height();
	$("#rightPanel").height(cardHeight + 0.5 * (window.innerHeight - cardHeight));
	$("#rightPanel").width(window.innerWidth - $("#cardPanel").width() - 50);

	// If about text runs too low, hide the credits text so there isn't overlap
	if ($("#aboutText").offset().top + $("#aboutText").outerHeight(true) >
		$("#cardPanel").offset().top + $("#cardPanel").outerHeight(true)) {
		$("#creditText").hide();
	}

	initGoals();

	function getCellsForHeader(headerId) {
		let cells = [];

		if(headerId === "tlbr") {
			cells.push($("#0_0"));
			cells.push($("#1_1"));
			cells.push($("#2_2"));
			cells.push($("#3_3"));
			cells.push($("#4_4"));
		}
		else if(headerId === "bltr") {
			cells.push($("#4_0"));
			cells.push($("#3_1"));
			cells.push($("#2_2"));
			cells.push($("#1_3"));
			cells.push($("#0_4"));
		}
		else if (headerId.startsWith("col")) {
			let col = headerId.slice(-1);
			col = parseInt(col) - 1;

			for (let i = 0; i < 5; i++) {
				cells.push($("#" + i + "_" + col));
			}
		}
		else if (headerId.startsWith("row")) {
			let row = headerId.slice(-1);
			row = parseInt(row) - 1;

			for (let i = 0; i < 5; i++) {
				cells.push($("#" + row + "_" + i));
			}
		}
		else {
			assert(false);
		}

		assert(cells.length === 5);
		return cells;
	}

	// Initialize row/column headers
	$("th").each(function() {
		$(this).on("mouseenter", function() {
			let cells = getCellsForHeader($(this).attr("id"));

			for (let i = 0; i < cells.length; i++) {
				let cell = cells[i];
				cell.addClass("fakeHover");
			}
		});

		$(this).on("mouseout", function() {
			let cells = getCellsForHeader($(this).attr("id"));

			for (let i = 0; i < cells.length; i++) {
				let cell = cells[i];
				cell.removeClass("fakeHover");
			}
		});
	});

	// Create random ordering for goals to be selected
	Math.seedrandom(seed);

	let goalOrder = [];
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

	// Initialize each cell
	for(let i = 0; i < 5; i++) {
		for(let j = 0; j < 5; j++) {
			let goalId = goalOrder[i * 5 + j];
			let goal = possibleGoals[goalId];
			
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

	// Initialize new card button
	$("#newCardBtn").on("click", function() {
		let generatedSeed = Date.now();
		location.href = "?seed=" + generatedSeed;  // REDIRECT
	});

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

function initGoals() { 
	// CTRL-F 'dagger' to copy this, the unicode dagger -> \u2020

	// note: id must equal the index in the array.
	possibleGoals = [
		{
			description: "Collect all 5 coins from all 5 BoB poles, and pound them into the ground (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Shoot out of all 6 cannons in BoB (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Collect Big Bob-omb on the Summit without pressing A",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "You may press A to select the star on the star screen, but you may NOT hold this A press and use it as a \"half\" A press"
		},

		{
			description: "Die to all 4 minibosses",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "They must deal the killing blow that depletes your health to 0. Eyerok pushing you off the level does NOT count."
		},

		{
			description: "Read all 13 tutorial signs in BoB (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Collect (or re-collect) all 7 stars in BoB while wearing the wing cap",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "\"Re-collect\" means collecting a star when it is blue. This will likely be required for at least 1 star."
		},

		{
			description: "Shoot the cannon into the cage in WF and collect the star",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Collect 2 stars while wearing the metal cap in WF",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Read all 8 tutorial signs in WF (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Get hit by all 5 clams in JRB and collect what is inside them (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "You may collect what is inside the clam WHILE you are getting hit by it."
		},

		{
			description: "Knock over all 7 pillars in JRB cave without taking damage. Then collect a star that is NOT \"Treasure in the Ocean Cave\"",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Fall off the ships in both JRB and RR; (*) after each",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "To clarify: in each stage you must fall of the ship, and then collect a star in that stage with the same life."
		},
		
		{
			description: "Read all 5 tutorial signs in JRB (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Collect two different stars while wearing the metal cap in JRB",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Collect the red coin star in CCM with 0 or 1 A presses (\u2020)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Hint: You will almost certainly need 1 A press. Use it wisely."
		},


		{
			description: "Drop both baby penguins in CCM and both monkeys in TTM off the edge of the stage; (*) after each",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "You must drop both of them in the same life that you collect the star."
		},


		{
			description: "Read all 7 tutorial signs in CCM (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Collect 3 stars in CCM while carrying a penguin",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Collect Secret of the Haunted Books in BBH the intended way (book puzzle)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Kill all 11 small boos in BBH (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Defeat all 3 big boos in BBH using only jump kicks to attack (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Get covered by all 3 tox-boxes in SSL (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "If they damage you, then you were not covered. Covered means being safe inside of them."
		},


		{
			description: "Collect Inside the Ancient Pyramid without entering from the top of the pyramid",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Read all 5 tutorial signs in SSL (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Kill all enemies in LLL (*) (\u2020)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "10 small bullies, 2 big bullies, 2 Mr. I's.\n2 of the small bullies are inside the volcano."
		},


		{
			description: "Get knocked into lava by 5 different bullies in LLL in one life (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Collect all 23 coins inside the volcano in LLL (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		

		{
			description: "Kill all 11 bats in HMC (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},


		{
			description: "Break all 6 cork boxes in HMC (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		


		{
			description: "Get ejected from the HMC waterfall (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Complete 2 laps around the HMC island while riding Dorrie the dinosaur's head (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Read all 14 tutorial signs in HMC (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Get ejected from the black pit in DDD",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect 8 red coins in DDD when the sub is absent",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Touch all 7 \"water diamonds\" in WDW",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Collect all 10 coins from small goombas in THI",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "If you kill a goomba without spawning his coin (or fail to collect a coin), you can't complete this task without re-entering the level."
		},

		{
			description: "Get eaten by both Bubbas (fish) in THI",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Ground pound the pole in the middle island of THI into the ground (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Touch all 12 mushrooms in TTM in the same life (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect Blast to the Lonely Mushroom in TTM with the cannon",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Talk to the penguin in SL and cross the ice bridge with him escorting you",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Get Stomp on the Thwomp in TTC with random time (clock hand on \"6\")",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect Cruiser Crossing the Rainbow and 8 red coins in RR without wallkicking",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Get all 80 coins in BitS",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Do Bowser throws in the opposite direction you normally do",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Honor system people...\nThrows that require <1 full revolution can be either direction"
		},
		
		{
			description: "Collect all 80 coins on the Peach slide",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Fall off the level in Wing Mario Over the Rainbow (cloud stage)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect all the coins on all 3 slides",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Peach Slide - 80 coins\nCCM Slide - 77 coins\nTTM Slide - 47 coins (be observant!)\nNote: Collecting stars is not required"
		},
		
		{
			description: "Collect all 4 lives and all 27 coins in the Vanish Cap stage (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Break all 6 wingcap boxes in cloud stage (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect all 47 coins in the Metal Cap stage (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect all 56 coins in the Secret Aquarium (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect the Secret Aquarium star with only one A press (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "One Half-A press would alse be accepted, TJ \"Henry\" Yoshi."
		},
		
		{
			description: "Kill all 10 boos in the castle courtyard",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "BLJ warp into WDW from the endless staircase",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "End the game with a prime number of stars",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "17, 19, 23, 29, 31, 37, 41, etc..."
		},
		
		{
			description: "End the game with exactly 6 lives and 9 coins",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "lol"
		},

		{
			description: "End the game with exactly 4 lives and 20 coins",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "lol"
		},
		
		{
			description: "Collect 5 stars with names starting with F",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			description: "Collect 5 stars with names starting with B",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			description: "Collect 5 stars with names starting with S",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			description: "Collect 5 stars with names starting with a vowel (A, E, I, O, U)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Official star select screen names"
		},
		
		{
			description: "Trigger 4 \"star spawn\" animations in a single visit to a level, and collect a star",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Any star that starts off obtainable in the level without triggering a \"star spawn\" animation does not count towards the 4"
		},
		
		{
			description: "Collect 2 stars while having exactly 99 coins",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},
		
		{
			description: "Collect 10 different caps from boxes, but don't use them for anything (\u2020)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Spawning with a cap in a cap stage doesn't count towards the 10. You may not fly, walk through walls/enemies, walk/sink underwater, or use metalcap invincibility. You MAY collect a star wearing the cap as long as you don't USE the cap for anything."
		},
		
		{
			description: "Take 7 warps (no repeats) (\u2020)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Taking the same warp both directions only counts as 1."
		},
		
		{
			description: "No ledge grabs (\u2020)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "If you ledge grab you must die or exit the stage through the start menu; If you are outside a level you must die before continuing"
		},

		{
			description: "No Z button (\u2020)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "If you press Z you must die or exit the stage through the start menu; If you are outside a level you must die before continuing"
		},

		{
			description: "Experience death by fire, drowning, and electrecution",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Lose and recover Mario's hat in SL, SSL, and TTM; (*) after each",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Roll both logs to the opposite end in LLL and TTM; (*) after each",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Get thrown by all 5 Chuckyas; (*) after each (except BitS)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Kill 15 different enemies with Mario's stationary \"breakdance\" (Z+B) (*)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "You may kill multiple of an enemy type (e.g., goombas), but you may not kill an enemy, then respawn it, then kill it again"
		},

		{
			description: "Destroy all 5 crazy-boxes and collect every resulting coin",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Collecting stars afterwards is not necessary"
		},

		{
			description: "Collect both of the coins outside the castle; Collect the resulting 1-up",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Get tossed by all 4 heave-hos",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "Collecting stars afterwards is not necessary"
		},

		{
			description: "Press 4 different purple ! switches; (*) after each if in a non-Bowser stage",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		},

		{
			description: "Complete BitDW stage with your controller up-side down (can do throws right-side up)",
			difficulty: -1,
			tags: "TODO", // synergy tags
			tooltip: "No extra explanation"
		}
	];

	// verify integrity of all goals
	for(let i = 0; i < possibleGoals.length; i++) {
		let goal = possibleGoals[i];
		
		goal.id = i;
		assert(goal.description !== "");

		// TODO: enable this for release.
		// Non-assigned difficulties are set to -1, but must be assigned
		// before release!
		// assert(goal.difficulty > 0);
	}
}


init();
