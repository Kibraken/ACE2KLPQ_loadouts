import { template } from './sqfTemplate';

export function sqfExport(classes, options) {
	let exportObject = {};

	let loadoutSide = ``;
	let loadoutVars = ``;
	let loadoutArray = `private _loadoutArray = [\r\n[\r\n // Uniforms per class`;
	let equipmentArray = `// Equipment per class\r\n[\r\n`;
	let boxItems = ` private _boxItems = [`;
	let boxMedicine = `private _boxMedicine = [`;

	let mgMags = ``;
	let medicItems = ``;
	let lat = ``;
	let fragGrenade = `HandGrenade`;
	let smokeGrenade = `SmokeShellBlue`;

	// Template constants
	loadoutVars += `private _basicMedicine = ${template.medicine};\r\n`;
	loadoutVars += `private _advancedMedicine = ${template.advancedMedicine};\r\n`;

	// Going through additional options
	if (!options.side) {
		loadoutSide = 'WEST';
	} else {
		loadoutSide = options.side;
	}

	if (options.medicine === 'advanced') {
		loadoutVars += `private _medicine = [${template.advancedMedicine}];\r\n`;
		loadoutVars += `private _medicItems = [${template.medicAdvancedMedicine}];\r\n\r\n`;
	} else {
		loadoutVars += `private _medicine = [${template.medicine}];\r\n`;
		loadoutVars += `private _medicItems = [${template.medicMedicine}];\r\n\r\n`;
	}

	if (options.fragGrenade) {
		fragGrenade = options.fragGrenade;
	}
	if (options.smokeGrenade) {
		smokeGrenade = options.smokeGrenade;
	}

	// Process classes
	Object.entries(classes).forEach(entry => {
		let defaultOptions = [];

		let classVar = entry[0];
		let className = entry[1].className;
		let classTags = entry[1].classTags || [];
		let classOptions = entry[1].classOptions || defaultOptions;
		let classLoadout = entry[1].classLoadout || [];

		// Fashion(or your clothes)
		// private _${className}Fashion = ["uniform_class_name", "vest", "hat", "backpack", "glasses"];
		let [uniform, vest, headgear, backpack, glasses] = classLoadout.newUniform;
		loadoutVars += `private _${classVar}Fashion = ["${uniform}", "${vest}", "${backpack}", "${headgear}", "${glasses}"];\r\n`;

		// Primary weapon
		// private _${className}Primary = ["weapon_class_name", [[primary mags], [secondary mags]], [addons]];
		loadoutVars += `private _${classVar}Primary = ${JSON.stringify(
			classLoadout.newRifle
		)};\r\n`;

		// Secondary weapon
		// private _${className}Secondary = ["weapon_class_name", [[mags]], [addons]];
		loadoutVars += `private _${classVar}Secondary = ${JSON.stringify(
			classLoadout.newHandgun
		)};\r\n`;

		// Launcher weapon
		// private _${className}Secondary = ["weapon_class_name", [[mags]], [addons]];
		loadoutVars += `private _${classVar}Launcher = ${JSON.stringify(
			classLoadout.newLauncher
		)};\r\n`;

		// Special items and misc.
		// private _${classVar}Items = [["item name", amount]];
		let classItems = ``;
		let classLinkItems = ``;
		//let classBinoculars;
		if (classOptions.binocular) {
			classItems += `["${classOptions.binocular}", 1], `;
		}
		if (classOptions.compass) {
			classLinkItems += `"ItemCompass", `;
		}
		if (classOptions.gps) {
			classLinkItems += `"ItemGPS", `;
		}
		if (classOptions.map) {
			classLinkItems += `"ItemMap", `;
		}
		//if(classOptions.mgMags) { classItems += `["${mgMags}"]`; }
		if (classOptions.nvg) {
			classLinkItems += `"${classOptions.nvg}", `;
		}
		if (classOptions.radioFt) {
			classItems += `["${classOptions.radioFt}", 1], `;
		}
		if (classOptions.radioSq) {
			classItems += `["${classOptions.radioSq}", 1], `;
		}

		// Dirty hacks to catch a few variables
		if (
			(classVar === 'autorifleman' ||
				classVar === 'lmg' ||
				classVar === 'machineGunner') &&
			classLoadout.newRifle[1][0].length > 0
		) {
			mgMags = classLoadout.newRifle[1][0];
		}
		// Note: this is a crude override, figure out something better
		if (classVar === 'combatLifeSaver' || classVar === 'medic') {
			classItems += `${template.medicMedicine}, `;
		}
		// If you are a rifleman, this won't make life worse, this will just put you in your place
		if (classVar === 'rifleman' && mgMags.length > 0) {
			classItems += `["${mgMags}", 2], `;
		}

		if (classVar === 'riflemanAT' && lat.length < 0) {
			lat = classLoadout.newLauncher[0];
		}

		classItems = classItems.trimRight().slice(0, -1);
		classLinkItems = classLinkItems.trimRight().slice(0, -1);
		loadoutVars += `private _${classVar}Items = [${classItems}];\r\n`;
		loadoutVars += `private _${classVar}LinkItems = [${classLinkItems}];\r\n\r\n`;

		// Class loadout put together
		let loadoutName = `"${className}", `;
		if (classTags.length > 0) {
			classTags.forEach(tag => {
				loadoutName += '"' + tag + '", ';
			});
		}
		loadoutName = loadoutName.trimRight().slice(0, -1);
		loadoutArray += `\r\n  [\r\n    [${loadoutName}],\r\n[\r\n    _${classVar}Fashion,\r\n    [_${classVar}Primary, _${classVar}Secondary, _${classVar}Launcher]\r\n]\r\n],\r\n`;

		// Class equipment
		equipmentArray += `\r\n  [\r\n    [${loadoutName}],\r\n    _${classVar}Items,\r\n    _${classVar}LinkItems\r\n  ],`;
	});

	// Box Items
	boxItems += template.boxItems + ', ';
	boxItems += `["${fragGrenade}", 20], `;
	boxItems += `["${smokeGrenade}", 20], `;
	if (lat.length > 0) {
		boxItems += `["${lat}", 20]`;
	}
	boxItems = boxItems.trimRight().slice(0, -1) + '];\r\n';

	boxMedicine += template.medicine + '];\r\n';

	loadoutArray = loadoutArray.trimRight().slice(0, -1);
	equipmentArray = equipmentArray.trimRight().slice(0, -1);
	loadoutArray =
		loadoutArray +
		'\r\n], ' +
		equipmentArray +
		'\r\n],\r\n// Personal items per class\r\n _boxItems + _boxMedicine, \r\n_identity \r\n];';
	loadoutArray += `\r\n//output of the function, do not remove or change\r\n_loadoutArray\r\n`;

	exportObject.sqf =
		loadoutVars +
		'\r\n' +
		boxItems +
		'\r\n' +
		boxMedicine +
		'\r\n' +
		loadoutArray +
		'\r\n\r\n';

	exportObject.filename =
		'fn_loadout' +
		loadoutSide.charAt(0).toUpperCase() +
		loadoutSide.slice(1).toLowerCase() +
		'.sqf';
	return exportObject;
}
