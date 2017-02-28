function isStage(tag) {
	return tag === "bob" ||
		tag === "ccm" ||
		tag === "wf" ||
		tag === "jrb" ||
		tag === "bbh" ||
		tag === "ssl" || 
		tag === "lll" ||
		tag === "hmc" || 
		tag === "ddd" ||
		tag === "wdw" || 
		tag === "thi" ||
		tag === "ttm" || 
		tag === "sl" ||
		tag === "rr" ||
		tag === "ttc";
}

function getTagSynergy(tag1, tag2) {
	function match(t1, t2) {
		if(true) { // dev
			assert(validTags.indexOf(t1) !== -1);
			assert(validTags.indexOf(t2) !== -1);
		}
		
		return (t1 === tag1 && t2 === tag2) || (t1 === tag2 && t2 === tag1);
	}

	if (true) { // dev
		assert(validTags.indexOf(tag1) !== -1);
		assert(validTags.indexOf(tag1) !== -1);
	}

	if(tag1 === "nosynergy" || tag2 === "nosynergy") {
		return 0;
	}
	
	if (tag1 === tag2) {
		if (isStage(tag1)) {
			return 1;
		}

		if (tag1.startsWith("need_")) {
			return 3;
		}

		if (tag1 === "lll100") {
			return 4;
		}

		if (tag1 === "metalcap") {
			return 6;
		}

		if (tag1 === "vanishcap") {
			return 10;
		}

		if (tag1 === "wingcap") {
			return 3;
		}

		if (tag1 === "aquarium") {
			return 4;
		}

		if (tag1 === "bitdwreds") {
			return 2;
		}

		if (tag1 === "bitfsreds") {
			return 3;
		}

		if (tag1 === "bitsreds") {
			return 3;
		}
	}

	if (match("peachslide", "slides")) {
		return 3;
	}

	if (match("spinykill", "breakdancekill")) {
		return 3;
	}

	if (match("uselesscaps", "wingcap")) {
		return 6;
	}

	if (match("uselesscaps", "metalcap")) {
		return 6;
	}

	if (match("uselesscaps", "vanishcap")) {
		return 6;
	}

	if (match("opencannons", "usecannons")) {
		return 2;
	}

	if (match("endwithcoins", "bitsallcoins")) {
		return -5;
	}

	return 0;
}

function getGoalSynergy(goal1, goal2) {
	let synergy = 0;

	for (let i = 0; i < goal1.tags.length; i++) {
		for (let j = 0; j < goal2.tags.length; j++) {
			synergy += getTagSynergy(goal1.tags[i], goal2.tags[j]);
		}
	}

	return synergy;
}

function isAllowed(goal1, goal2) {
	for (let i = 0; i < goal1.tags.length; i++) {
		for (let j = 0; j < goal2.tags.length; j++) {
			let tag1 = goal1.tags[i];
			let tag2 = goal2.tags[j];
			
			if (tag1 === tag2) {
				if (tag1 === "nosynergy" ||
					tag1 === "swimanimation" ||
					tag1 === "purpleswitches" ||
					tag1 === "uselesscaps" ||
					tag1 === "blueswitches" ||
					tag1 === "opencannons" ||
					tag1 === "signs") {
					return false;
				}
			}
		}
	}

	return true;
}

// Returns object with row difficulty, and an list of arrays of cells
// that are breaking rules
function evaluateRow(row) {
	assert(row.length === 5);

	let result = {
		totalDifficulty: 0,
		ruleBreakers: [],
	}
	
	for (let i = 0; i < 5; i++) {
		let goal = row[i];
		
		result.totalDifficulty += goal.difficulty;

		for (let j = i + 1; j < 5; j++) {
			let otherGoal = row[j];

			result.totalDifficulty -= getGoalSynergy(goal, otherGoal);

			if (!isAllowed(goal, otherGoal)) {
				result.ruleBreakers.push( [goal, otherGoal] );
			}
		}
	}

	return result;
}
