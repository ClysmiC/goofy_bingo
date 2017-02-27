var possibleGoals;
var validTags;
var goalsByDifficulty;
var cellGoals = [];
var goalOrder = [];

var baseDifficulty = 30;  // everything row has some "base" difficulty of beating the game

var averageDifficulty;
var difficultyStdDev;

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
		let generatedSeed = Math.floor(Math.random() * 1000000000);
		location.href = "?seed=" + generatedSeed;  // REDIRECT
		return;
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

	initGoals(seed);

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

	function getGoalsForHeader(headerId) {
		let goals = [];

		if(headerId === "tlbr") {
			goals.push(cellGoals[0][0]);
			goals.push(cellGoals[1][1]);
			goals.push(cellGoals[2][2]);
			goals.push(cellGoals[3][3]);
			goals.push(cellGoals[4][4]);
		}
		else if(headerId === "bltr") {
			goals.push(cellGoals[4][0]);
			goals.push(cellGoals[3][1]);
			goals.push(cellGoals[2][2]);
			goals.push(cellGoals[1][3]);
			goals.push(cellGoals[0][4]);
		}
		else if (headerId.startsWith("col")) {
			let col = headerId.slice(-1);
			col = parseInt(col) - 1;

			for (let i = 0; i < 5; i++) {
				goals.push(cellGoals[i][col]);
			}
		}
		else if (headerId.startsWith("row")) {
			let row = headerId.slice(-1);
			row = parseInt(row) - 1;

			for (let i = 0; i < 5; i++) {
				goals.push(cellGoals[row][i]);
			}
		}
		else {
			assert(false);
		}

		assert(goals.length === 5);
		return goals;
	}

	function setGoal(row, col, goal) {
		assert(row != null);
		assert(col != null);
		
		let id = row + "_" + col;
		let cell = $("#" + id);
		
		let oldGoal = cellGoals[row][col];
		if (oldGoal != null) {
			oldGoal.row = null;
			oldGoal.col = null;
		}
		
		cell.text(goal.description);
		cell.prop("title", goal.tooltip);
		
		cellGoals[row][col] = goal;
		goal.row = row;
		goal.col = col;
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

	let goalIndex = 0;
	function nextGoal(row, col, difficulty) {
		let valid = false;
		
		if(difficulty != null &&
		   (difficulty <= 0 || difficulty >= goalsByDifficulty.length)) {
			return null;
		}

		if (difficulty == null) {
			
			// Just grab the next available goal
			
			while(true) {
				let goal = possibleGoals[goalOrder[goalIndex]];
				goalIndex = (goalIndex + 1) % possibleGoals.length;

				if (goal.row == null) {
					return goal;
				}
			}
		}
		else {

			// Find a goal with the exact specified difficulty,
			// or return null
			
			for (let i = 0; i < goalsByDifficulty[difficulty].length; i++) {
				let goal = goalsByDifficulty[difficulty][i];

				if (goal.row == null) {
					return goal;
				}
			}

		}

		return null;
	}

	// Initialize each cell
	for(let i = 0; i < 5; i++) {
		cellGoals.push([]);
		
		for(let j = 0; j < 5; j++) {
			let goal = nextGoal(i, j);
			setGoal(i, j, goal);
			
			let id = i + "_" + j;
			let cell = $("#" + id);
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

	let nothingChanged;
	let iterations = 0;
	let headers = ["row1", "row2", "row3", "row4", "row5", "col1", "col2", "col3", "col4", "col5", "tlbr", "bltr"];
	let lowDifficultyLimit = baseDifficulty + Math.floor(5 * averageDifficulty - Math.sqrt(5 * difficultyStdDev));
	let highDifficultyLimit = baseDifficulty + Math.ceil(5 * averageDifficulty + Math.sqrt(10 * difficultyStdDev)); // more leeway on the high side
	
	do {
		nothingChanged = true;

		let dbg_msg = "";
		for (let i = 0; i < headers.length; i++) {
			let header = headers[i];
			let goals = getGoalsForHeader(header);
			let evaluation = evaluateRow(goals);

			dbg_msg += header + ": " + evaluation.totalDifficulty;

			if (evaluation.ruleBreakers.length > 0) {
				dbg_msg += " (INVALID)";
			}

			dbg_msg += "\n";
		}

		console.log(dbg_msg);

		for (let i = 0; i < headers.length; i++) {
			let header = headers[i];
			let goals = getGoalsForHeader(header);
			let evaluation = evaluateRow(goals);

			if (evaluation.ruleBreakers.length > 0) {
				for (let j = 0; j < evaluation.ruleBreakers.length; j++) {
					let goal1 = evaluation.ruleBreakers[j][0];

					if (goal1.row == null) {
						// was involved in a prior rule break that was
						// already resolved!
						continue;
					}

					let row = goal1.row;
					let col = goal1.col;

					let newGoal = null;
					let k = 1;
					do {
						let newGoalDifficulty;

						// check for same difficulty, then +1, then -1, then +2, then -2, ...
						if (k % 2 === 0) {
							newGoalDifficulty = goal1.difficulty + Math.floor(k / 2);
						}
						else {
							newGoalDifficulty = goal1.difficulty - Math.floor(k / 2);
						}
						
						newGoal = nextGoal(row, col, newGoalDifficulty);

						if (newGoal != null) {
							setGoal(row, col, newGoal);
						}

						k++;
					} while(newGoal == null)
					

				}
				
				nothingChanged = false;
			}
			else if(evaluation.totalDifficulty < lowDifficultyLimit ||
					evaluation.totalDifficulty > highDifficultyLimit) {
				// try to distribute the increase across the whole row so it doesn't
				// mess up a perpendicular row
				let deltaPerCell;
				let tooLow = evaluation.totalDifficulty < lowDifficultyLimit;

				if (tooLow) {
					deltaPerCell = Math.ceil((lowDifficultyLimit - evaluation.totalDifficulty) / 5);
				}
				else {
					deltaPerCell = Math.ceil((highDifficultyLimit - evaluation.totalDifficulty) / 5);
				}

				// we won't always be able to increase by deltaPerCell, so this accumulates
				// how inaccurate our increases are, and our future increases will take it into account
				let accumulatedError = 0;
				for (let j = 0; j < 5; j++) {
					let goal = goals[j];
					let row = goal.row;
					let col = goal.col;
					
					let targetDifficulty = goal.difficulty + deltaPerCell - accumulatedError;
					let newGoalFound = false;
					let newGoalDifficulty = targetDifficulty;
					
					while (!newGoalFound && newGoalDifficulty < goalsByDifficulty.length && newGoalDifficulty >= 0) {
						let newGoal = nextGoal(row, col, newGoalDifficulty);

						if (newGoal != null) {
							newGoalFound = true;
							setGoal(row, col, newGoal);
						}
						else {
							if (tooLow) {
								newGoalDifficulty++;
							}
							else {
								newGoalDifficulty--;
							}
						}
					}

					if (newGoalFound) {
						// the goal we found was slightly too hard/easy,
						// so next replacement should be slightly easier/harder
						accumulatedError = newGoalDifficulty - targetDifficulty;
					}
					else {
						// we couldn't find a harder/easier goal, so
						// next replacement needs to pick up the slack
						accumulatedError = goal.difficulty - targetDifficulty;
					}
				}
				
				nothingChanged = false;
			}
		}

		iterations += 1;
		console.log("Iteration " + iterations);

	} while (!nothingChanged && iterations <= 200)

	// Show the cells once they are finalized
	$("td").css("visibility", "visible");

	// Initialize new card button
	$("#newCardBtn").on("click", function() {
		let generatedSeed = Math.floor(Math.random() * 1000000000);
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


init();
