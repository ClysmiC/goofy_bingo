var possibleGoals;
var validTags;
var goalsByDifficulty;
var cellGoals = [];
var goalOrder = [];

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


	// Grabs a random, available goal
	function nextGoal() {
		// Just grab the next available goal
		while(true) {
			let goal = possibleGoals[goalOrder[goalIndex]];
			goalIndex = (goalIndex + 1) % possibleGoals.length;

			if (goal.row == null) {
				return goal;
			}
		}
	}

	// Finds the goal with difficulty closest to the specified parameter,
	// that legally fits in the specified row/column considering legal tag combinations
	function replaceGoal(row, col, difficulty) {
		if (difficulty < 1) {
			difficulty = 1;
		}
		if (difficulty > goalsByDifficulty.length) {
			difficulty = goalsByDifficulty.length;
		}

		let i = 0;
		while (true) {
			i++;

			let newGoalDifficulty;

			// check for same difficulty, then +1, then -1, then +2, then -2, ...
			if (i % 2 === 0) {
				newGoalDifficulty = difficulty + Math.floor(i / 2);
			}
			else {
				newGoalDifficulty = difficulty - Math.floor(i / 2);
			}

			if (newGoalDifficulty <= 0 || newGoalDifficulty >= goalsByDifficulty.length) {
				continue;
			}
			
			for (let j = 0; j < goalsByDifficulty[newGoalDifficulty].length; j++) {
				let goal = goalsByDifficulty[newGoalDifficulty][j];

				if (goal.row == null) {
					let goals = [];

					// Unused goal found. Now verify it is legal in context.

					let rowGoals = getGoalsForHeader("row" + (row + 1));
					goals = goals.concat(rowGoals);

					let colGoals = getGoalsForHeader("col" + (col + 1));
					goals = goals.concat(colGoals);

					if (row === col) {
						let tlbrGoals = getGoalsForHeader("tlbr");
						goals = goals.concat(tlbrGoals);
					}

					if (row + col === 4) {
						let bltrGoals = getGoalsForHeader("bltr");
						goals = goals.concat(bltrGoals);
					}

					let isValid = true;

					for (let k = 0; k < goals.length; k++) {
						let otherGoal = goals[k];

						if (otherGoal.row === row && otherGoal.col === col) {
							continue;  // this is the goal being replaced
						}

						if (!isAllowed(goal, otherGoal)) {
							isValid = false;
							break;
						}
					}

					if (isValid) {
						return goal;
					}
				}
			}
		}
	}

	// Initialize each cell
	for(let i = 0; i < 5; i++) {
		cellGoals.push([]);
		
		for(let j = 0; j < 5; j++) {
			let goal = nextGoal();
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
	let lowDifficultyLimit = Math.floor(5 * averageDifficulty - Math.sqrt(5 * difficultyStdDev));
	let highDifficultyLimit = Math.ceil(5 * averageDifficulty + 1.2 * Math.sqrt(5 * difficultyStdDev));  // give a litle more leeway on the harder side :)
	
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

		// DEV
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
					newGoal = replaceGoal(row, col, goal1.difficulty);
					setGoal(row, col, newGoal);
				}
				
				nothingChanged = false;
			}
			else if(evaluation.totalDifficulty < lowDifficultyLimit ||
					evaluation.totalDifficulty > highDifficultyLimit) {

				// our new target should be *slightly* higher than average, because
				// we can expect goal synergies to bring it down
				let midDifficulty = (lowDifficultyLimit + highDifficultyLimit) / 2;
				let targetCombinedDifficulties = midDifficulty + 5;

				// try to distribute the increase across the whole row so it doesn't
				// mess up a perpendicular row
				let deltaPerCell = Math.round((targetCombinedDifficulties - evaluation.totalDifficulty) / 5);

				if (deltaPerCell === 0) {
					if(evaluation.totalDifficulty < lowDifficultyLimit) { deltaPerCell = 1; }
					else { deltaPerCell = -1; }
				}

				// we won't always be able to increase by deltaPerCell, so this accumulates
				// how inaccurate our increases are, and our future increases will take it into account
				let accumulatedError = 0;
				for (let j = 0; j < 5; j++) {
					let goal = goals[j];
					let row = goal.row;
					let col = goal.col;
					
					let targetDifficulty = goal.difficulty + deltaPerCell - accumulatedError;
					
					let newGoal = replaceGoal(row, col, targetDifficulty);
					setGoal(row, col, newGoal);

					accumulatedError = newGoal.difficulty - targetDifficulty;
				}
				
				nothingChanged = false;
			}
		}

		iterations += 1;
		console.log("Iteration " + iterations);

	} while (!nothingChanged && iterations <= 50)

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
