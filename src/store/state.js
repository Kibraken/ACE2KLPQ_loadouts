import { roles, additionaloptionsTemplate, initData } from '../misc/data';

const state = {
	Screen: 'Basic',
	copied: false,
	isModalOpen: false,
	modalType: 'save',
	user_name: '',
	loadout_name: '',
	saved_loadouts: [],
	dbSelected: false,
	upd: false,
	err: {},
	Basic: {
		Loadout: {},
		ExportArr: JSON.stringify(initData),
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
export default state;
