import { ParseLoadout } from '../misc/parsConverter';
import { sqfExport } from '../sqfExport';

export const switchScreen = ({ state }, screen) => (state.Screen = screen);

/*---------------------------BASIC------------------------------------------*/

export const textAreaChangeBasic = async ({ state }, event) => {
	let txt = await JSON.parse(event.target.value);
	state.Basic.ExportArr = txt;
};

export const magsChange = ({ state }, event) =>
	(state.Basic.ammo[event.currentTarget.id] =
		event.target.value !== '' ? parseInt(event.target.value) : 1);

export const basicConvert = async ({ state }) => {
	const convert = await new ParseLoadout(
		state.Basic.ExportArr,
		state.Basic.ammo
	);
	state.Basic.Loadout = await convert.convertFn();
};

/*---------------------------ADV------------------------------------------*/
export const textAreaChangeAdv = ({ state }, event) => {
	try {
		state.Advanced.importArr = JSON.parse(JSON.stringify(event.target.value));
	} catch (error) {
		console.log('error in textAreaChangeAdv', error);
		state.Advanced.importArr = event.target.value;
	}
};
export const saveThisimport = ({ state }) =>
	(state.Advanced.saveImport = !state.Advanced.saveImport);

export const handleClassText = ({ state }, event) => {
	//refactor
	//todo check for unique name
	let txt = event.target.value;
	let { currentSelection } = state.Advanced;
	let classes = { ...state.Advanced.classes };
	classes[currentSelection].className = txt.length === 0 ? '_' : txt;
	state.Advanced.classes = classes;
	//todo additional tags for classes
};

export const handleNumInput = ({ state }, value) => {
	let num = value[0],
		name = value[1],
		type = value[2];
	let additionaloptions = { ...state.Advanced.additionaloptions };
	if (type === 'amount') {
		additionaloptions[name][type] = num !== '' || num !== NaN ? parseInt(num) : 1;
	} else {
		additionaloptions[name][type] = num !== '' ? num : '_';
	}
	state.Advanced.additionaloptions = additionaloptions;
};
export const handleCheckboxChange = ({ state }, id) => {
	let { currentSelection, classes } = state.Advanced;
	classes[currentSelection].classOptions[id] = !classes[currentSelection]
		.classOptions[id];
};

export const handleCheckboxChangeClass = ({ state }, event) => {
	let { classes } = state.Advanced;
	let id = event.currentTarget.id;
	classes[id].classOptions.isChecked = !classes[id].classOptions.isChecked;
};

export const handleClassSelection = ({ state }, id) => {
	let { classes, currentSelection } = state.Advanced;

	classes[id].classOptions.isSelected = true;
	classes[currentSelection].classOptions.isSelected = false;

	state.Advanced.currentSelection = id;
};

export const addNewRole = ({ state }) => {
	let { classes } = state.Advanced;
	let num = Object.keys(classes).length - 11; //i hope initial length will be static

	classes[`CustomRole${num}`] = {
		className: '',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false,
			converted: false,
			nvg: false,
			map: false,
			compass: false
		},
		exportUsed: false
	};
	classes[`CustomRole${num}`].className = `CustomRole${num}`;
};

export const advConvert = async ({ state }, Selected) => {
	let classes = { ...state.Advanced.classes };
	let {
		additionaloptions,
		importArr,
		currentSelection,
		saveImport
	} = state.Advanced;
	if (Selected && !classes[Selected].classOptions.isChecked) return;
	if (Selected) currentSelection = Selected;
	try {
		importArr = JSON.parse(importArr);
		if (typeof importArr !== 'object') throw new Error('not an array');
	} catch (error) {
		return console.log('something wrong with the import', error);
	}

	let ammo = {
		RifleMags: additionaloptions.rifleAmmo.amount,
		SidearmMags: additionaloptions.sidearmAmmo.amount,
		RLrockets: additionaloptions.rockets.amount
	};
	const convert = await new ParseLoadout(importArr, ammo);
	classes[currentSelection].classLoadout = await convert.convertFn();
	classes[currentSelection].classOptions.converted = true;
	if (classes[currentSelection].classOptions.nvg)
		classes[currentSelection].classOptions.nvg = additionaloptions.nvg.type;
	if (classes[currentSelection].classOptions.binocular)
		classes[currentSelection].classOptions.binocular =
			additionaloptions.binocular.type;
	classes[currentSelection].exportUsed = state.Advanced.importArr;
	if (saveImport === true) {
		state.Advanced.classes = classes;
	} else {
		state.Advanced.classes = classes;
		state.Advanced.importArr = '';
	}
};

export const exportToFile = ({ state }) => {
	let exportObj = {};
	let classes = { ...state.Advanced.classes };
	Object.keys(classes).some((i, index) => {
		if (classes[i].classOptions.isChecked && !classes[i].classOptions.converted)
			return (
				console.log('not all checked roles has converted loadouts'),
				(exportObj = false),
				true
			);
		if (classes[i].classOptions.isChecked && classes[i].classOptions.converted)
			exportObj = { ...exportObj, [i]: classes[i] };
	});
	if (exportObj) {
		let exportFile = sqfExport(exportObj, state.Advanced.additionaloptions);
		// exportFile {
		// 	sqf: <sqf data>
		//  filename: <sqf filename>
		// }
		state.Advanced.sqfExport = exportFile.sqf;
	}
};

export const fillAllRolesAtOnce = ({ state, actions }) => {
	const classes = { ...state.Advanced.classes };
	try {
		Object.keys(classes).forEach(i => {
			actions.advConvert(i);
		});
	} catch (error) {
		console.log('uh-oh something wrong in fillAllRolesAtOnce', error);
	}
};

export const showInfo = ({ state }) =>
	(state.Advanced.showInfo = !state.Advanced.showInfo);
