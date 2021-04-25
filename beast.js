nb.tarStaggeringOrDazed = false;

nb.beastOnKill = function() {
	if (nb.class !== "BEAST") return;
	nb.tarStaggeringOrDazed = false;
}
nb.beastCheckOverclock = function(msg) {
	if (!nb.haveSkill("suittech","overclock") || ("ab_SuitTech_overclock" in nb.cooldowns)) return;
	if (nb.haveSkill("mwp","dualshot")) { //if we have dualshot, only use it with dualshot.
		if (msg === "mwp dualshot") {
			nb.send("overclock");
		}
		return;
	} else if (nb.haveSkill("mwp","hobble")) { //we don't have dualshot, only use it with hobble.
		if (msg === "mwp hoble") {
			nb.send("overclock");
		}
		return;
	} else { //we don't have dualshot or hobble but do have overclock for some reason, just use it.
		nb.send("overclock"); 
	}
}
nb.offense.BEAST = function(){
	var backhand = nb.haveSkill("suittech","backhand");
	var minigun = nb.haveSkill("mwp","minigun");
	var hobble = nb.haveSkill("mwp","hobble");
	var dualshot = nb.haveSkill("mwp","dualshot");
	if (!backhand && !hobble) {
		//we do not use minigun, and must use plasma burn. Do not use heatup. 
		return "plasma burn "+nb.tar;
	}
	if (!("Plasma generation" in GMCP.Defences)) {
		return "heatup";
	}
	if (dualshot) {
		//if we have dualshot, we have hobble
		if (!("ab_MWP_dualshot" in nb.cooldowns)) {
			return "dualshot "+nb.tar;
		} else {
			return "hobble "+nb.tar;
		}
	} else {
		if (nb.tarStaggeringOrDazed) {
			return "mwp minigun "+nb.tar;
		} else if (hobble) {
			return "mwp hobble "+nb.tar;
		} else if (backhand) {
			return "suit backhand "+nb.tar;
		}
	}
}

/*
1) just Burn
2) backhand minigun
3) hobble minigun
4) dualshot/hobble
Do overclock if you have it and keep heatup going.
*/