import React from 'react';
import styled from 'styled-components';

let initData = [
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

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
const BasicWrapper = styled.div`
	background: tomato;
`;
const AdvWrapper = styled.div``;
const OutputWrap = styled.div`
	height: 180px;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	padding-left: 10px;
	width: fit-content;
`;
const DefaultInput = styled.textarea`
	width: 99.6%;
	height: 150px;
	margin-top: 15px;
`;
const RifleMagsInput = styled.input`
	width: 35px;
`;
const SidearmMagsInput = styled.input`
	width: 35px;
`;
const RocketsInput = styled.input`
	width: 35px;
`;
const MagsWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 150px;
`;
const Mags = styled.div`
	margin-left: 20px;
`;

const DefOutput = styled.pre`
	background: transparent;
	height: 20px;
	width: 100%;
	display: table-cell;
	vertical-align: middle;
	padding-left: 5px;
	font-weight: 400;
`;
const Output = styled.div`
	display: 'flex';
	flex-flow: column;
	height: 42px;
	width: 100%;
`;
const OutputHeader = styled.div`
	font-weight: 600;
`;
const DefUniformOutput = styled.pre``;

const TopSwitchWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 150px;
`;
const TopSwitchBtnL = styled.div`
	font-weight: 900;
	background: tomato;
	cursor: pointer;
	border: 1px solid black;
	border-bottom: none;
`;
const TopSwitchBtnR = styled.div`
	font-weight: 900;
	background: transparent;
	cursor: pointer;
	border: 1px solid black;
	border-bottom: none;
`;

class App extends React.Component {
	state = {
		Loadout: {},
		ExportArr: initData,
		RifleMags: 10,
		SidearmMags: 4,
		RLrockets: 2
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
		let rifle = this.state.ExportArr[0];
		let launcher = this.state.ExportArr[1];
		let handgun = this.state.ExportArr[2];

		let newRifle = this.parseGunsFn(rifle, this.state.RifleMags);
		let newHandgun = this.parseGunsFn(handgun, this.state.SidearmMags);
		let newLauncher = this.parseGunsFn(launcher, this.state.RLrockets);

		let newUniform = this.parseUniformFn(this.state.ExportArr);

		let newLoadout = { newRifle, newHandgun, newLauncher, newUniform };
		this.setState({ Loadout: newLoadout });
	};
	handleText = event => {
		let txt = JSON.parse(event.target.value);
		this.setState({ ExportArr: txt });
	};
	handleNumInput = event => {
		let mags = {};
		mags[event.currentTarget.id] =
			event.target.value !== '' ? parseInt(event.target.value) : 1;
		this.setState({ ...mags });
	};
	render() {
		return (
			<Wrapper>
				<TopSwitchWrap>
					<TopSwitchBtnL>BASIC</TopSwitchBtnL>
					<TopSwitchBtnR>ADVANCED</TopSwitchBtnR>
				</TopSwitchWrap>
				<BasicWrapper>
					<DefaultInput onChange={this.handleText}>
						{JSON.stringify(this.state.ExportArr)}
					</DefaultInput>

					<Mags>
						<MagsWrap>
							<label htmlFor='RifleMags'>Rifle Mags</label>
							<RifleMagsInput
								type='number'
								id='RifleMags'
								value={this.state.RifleMags}
								min='1'
								max='50'
								onChange={e => this.handleNumInput(e)}
							></RifleMagsInput>
						</MagsWrap>
						<MagsWrap>
							<label htmlFor='SidearmMags'>Sidearm Mags</label>
							<SidearmMagsInput
								type='number'
								id='SidearmMags'
								value={this.state.SidearmMags}
								min='1'
								max='30'
								onChange={e => this.handleNumInput(e)}
							></SidearmMagsInput>
						</MagsWrap>
						<MagsWrap>
							<label htmlFor='RLrockets'>RL rockets</label>
							<RocketsInput
								type='number'
								id='RLrockets'
								value={this.state.RLrockets}
								min='1'
								max='5'
								onChange={e => this.handleNumInput(e)}
							></RocketsInput>
						</MagsWrap>
					</Mags>

					<br />
					<button onClick={this.convertFn}>test</button>
					<br />
					<OutputWrap>
						<Output>
							<OutputHeader>Rifle</OutputHeader>
							<DefOutput>
								{this.state.Loadout.newRifle !== undefined &&
									this.state.Loadout.newRifle.length !== 0 &&
									JSON.stringify(this.state.Loadout.newRifle) + `;`}
							</DefOutput>
						</Output>
						<Output>
							<OutputHeader>Secondary (Launcher)</OutputHeader>
							<DefOutput>
								{this.state.Loadout.newLauncher !== undefined &&
									this.state.Loadout.newLauncher.length !== 0 &&
									JSON.stringify(this.state.Loadout.newLauncher) + `;`}
							</DefOutput>
						</Output>
						<Output>
							<OutputHeader>Handgun</OutputHeader>
							<DefOutput>
								{this.state.Loadout.newHandgun !== undefined &&
									this.state.Loadout.newHandgun.length !== 0 &&
									JSON.stringify(this.state.Loadout.newHandgun) + `;`}
							</DefOutput>
						</Output>
						<Output>
							<OutputHeader>Uniform</OutputHeader>
							<DefOutput>
								{this.state.Loadout.newUniform !== undefined &&
									this.state.Loadout.newUniform.length !== 0 &&
									JSON.stringify(this.state.Loadout.newUniform) + `;`}
							</DefOutput>
						</Output>
					</OutputWrap>
				</BasicWrapper>
			</Wrapper>
		);
	}
}

export default App;
