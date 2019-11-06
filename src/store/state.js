import { roles, additionaloptionsTemplate, initData } from '../misc/data';

export const state = {
	Screen: 'basic',
	copied: false,
	Basic: {
		Loadout: {},
		ExportArr: initData,
		ammo: { RifleMags: 10, SidearmMags: 4, RLrockets: 2 }
	},
	Advanced: {
		checked: false,
		importArr: JSON.stringify(initData),
		currentSelection: 'squadLeader',
		classes: roles,
		additionaloptions: additionaloptionsTemplate,
		saveImport: false,
		sqfExport: '',
		showInfo: false
	}
};
