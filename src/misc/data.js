export let initData = [
	[
		'CUP_arifle_AK101_GL',
		'RH_qdss_nt4',
		'rhs_acc_2dpZenit_ris',
		'',
		['CUP_30Rnd_556x45_AK', 30],
		['CUP_1Rnd_HE_GP25_M', 1],
		''
	],
	[],
	[
		'CUP_hgun_Glock17_blk',
		'muzzle_snds_L',
		'CUP_acc_Glock17_Flashlight',
		'',
		['CUP_17Rnd_9x19_glock17', 17],
		[],
		''
	],
	[
		'CFP_U_Crye_M90',
		[
			['FirstAidKit', 1],
			['Chemlight_green', 1, 1],
			['CUP_17Rnd_9x19_glock17', 1, 17]
		]
	],
	[
		'CFP_FAPC_Operator_OGA_OD',
		[
			['MiniGrenade', 2, 1],
			['SmokeShell', 1, 1],
			['SmokeShellGreen', 1, 1],
			['Chemlight_green', 1, 1],
			['CUP_17Rnd_9x19_glock17', 2, 17]
		]
	],
	[
		'CFP_Kitbag_White',
		[
			['MineDetector', 1],
			['DemoCharge_Remote_Mag', 5, 1],
			['SatchelCharge_Remote_Mag', 1, 1],
			['APERSTripMine_Wire_Mag', 1, 1],
			['APERSMine_Range_Mag', 1, 1],
			['CUP_1Rnd_HE_GP25_M', 4, 1]
		]
	],
	'CFP_OPS2017_Helmet_White',
	'CFP_Face_Wear_Spook',
	['Binocular', '', '', '', [], [], ''],
	[
		'ItemMap',
		'ItemGPS',
		'ItemRadio',
		'ItemCompass',
		'ItemWatch',
		'CUP_NVG_PVS15_winter'
	]
];

export let roles = {
	squadLeader: {
		className: 'officer',
		classTags: ['squad leader'],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: true,
			isChecked: true,
			mgMags: false
		}
	},
	combatLifeSaver: {
		className: 'combat life saver',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	engineer: {
		className: 'engineer',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	teamLeader: {
		className: 'team leader',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	missileSpecialistAT: {
		className: 'missile specialist (at)',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	missileSpecialistAA: {
		className: 'missile specialist (aa)',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	autorifleman: {
		className: 'autorifleman',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	riflemanAT: {
		className: 'rifleman (at)',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	pilot: {
		className: 'pilot',
		classTags: ['helicopter pilot'],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	crewman: {
		className: 'crewman',
		classTags: ['helicopter crew'],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	grenadier: {
		className: 'grenadier',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	},
	rifleman: {
		className: 'rifleman',
		classTags: [],
		classLoadout: {},
		classOptions: {
			binocular: false,
			gps: true,
			radioSq: true,
			radioFt: true,
			isSelected: false,
			isChecked: true,
			mgMags: false
		}
	}
};
