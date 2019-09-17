import React from 'react';

let data = [
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
/*
[
  [],
  [],
  [],
  [],
  [],
  [],
  "",
  "",
  [],
  ["","","","","",""]
]
*/
//[[],[],[],[],[],[],"","",[],["","","","","",""]]

class App extends React.Component {
	state = {
		Loadout: {},
		ExportArr: data
	};
	/*
  TODO  
  
  advanced mode for several uniforms at once
  advanced option to convert it into full loadout file
  advanced option: randomizing gear?
  UI
   parser for default BIS export
  */

	validateExp = data => {
		//[[],[],[],[],[],[],"","",[],["","","","","",""]]
		if (data.length !== 10 || data[9].length !== 6) {
			return console.log('not valid length'), true;
		}
		data.forEach((i, index) => {
			if ((index === 6 || index === 7) && typeof i !== 'string') {
				return console.log('not valid, missing strings'), true;
			} else if (index !== 6 && index !== 7 && typeof i !== 'object') {
				return console.log('not valid type of element', index), true;
			}
		});
		data[9].forEach((i, index) => {
			if (typeof i !== 'string') {
				return console.log('not valid type in arr'), true;
			}
		});
		return false;
	};

	parseGunsFn = (gun, mags) => {
		let newArr = [];
		gun.forEach((i, index) => {
			if (index === 0) {
				newArr = [i, [], []];
			} else if (typeof i === 'object') {
				if (i.length > 0) {
					newArr[1] = [...newArr[1], [i[0], mags]];
				}
			} else if (i.length === 0) {
				//do nothing
			} else {
				newArr[2] = [...newArr[2], i];
			}
		});
		return newArr;
	};
	parseUniformFn = exportData => {
		let uniform = [];
		exportData.forEach((i, index) => {
			switch (index) {
				case 3:
					return (
						i[0].length !== 0 &&
						typeof i[0] === 'string' &&
						(uniform = [...uniform, i[0]])
					);
				case 4:
					return (
						i[0].length !== 0 &&
						typeof i[0] === 'string' &&
						(uniform = [...uniform, i[0]])
					);
				case 5:
					return (
						i[0].length !== 0 &&
						typeof i[0] === 'string' &&
						(uniform = [...uniform, i[0]])
					);
				case 6:
					return (
						i.length !== 0 && typeof i === 'string' && (uniform = [...uniform, i])
					);
				case 7:
					return (
						i.length !== 0 && typeof i === 'string' && (uniform = [...uniform, i])
					);
				default:
					break;
			}
		});
		return uniform;
	};

	convertFn = () => {
		if (this.validateExp(this.state.ExportArr)) {
			return alert('not valid');
		}

		//refactor
		let rifle = this.state.ExportArr[0];
		let launcher = this.state.ExportArr[1];
		let handgun = this.state.ExportArr[2];

		let rifleMags = 15;
		let handgunMags = 4;
		let rockets = 1;

		let newRifle = this.parseGunsFn(rifle, rifleMags);
		let newHandgun = this.parseGunsFn(handgun, handgunMags);
		let newLauncher = this.parseGunsFn(launcher, rockets);

		let newUniform = this.parseUniformFn(this.state.ExportArr);

		let newLoadout = { newRifle, newHandgun, newLauncher, newUniform };
		this.setState({ Loadout: newLoadout });
	};
	handleText = event => {
		this.setState({ ExportArr: event.target.value });
	};
	render() {
		return (
			<div>
				<textarea
					value={this.state.ExportArr}
					onChange={this.handleText}
				></textarea>
				<br />
				<button onClick={this.convertFn}>test</button>
				<br />
				<div>Rifle</div>
				{this.state.Loadout.newRifle !== undefined ? (
					<pre> {JSON.stringify(this.state.Loadout.newRifle)}</pre>
				) : null}
				<div>Secondary (RPG)</div>
				{this.state.Loadout.newLauncher !== undefined ? (
					<pre> {JSON.stringify(this.state.Loadout.newLauncher)}</pre>
				) : null}
				<div>Handgun</div>
				{this.state.Loadout.newHandgun !== undefined ? (
					<pre> {JSON.stringify(this.state.Loadout.newHandgun)}</pre>
				) : null}
				<div>Uniform</div>
				{this.state.Loadout.newUniform !== undefined ? (
					<pre> {JSON.stringify(this.state.Loadout.newUniform)}</pre>
				) : null}
			</div>
		);
	}
}

export default App;
