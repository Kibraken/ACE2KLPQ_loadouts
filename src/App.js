import React from 'react';
import {
	Wrapper,
	BasicWrapper,
	AdvWrapper,
	OutputWrap,
	DefaultInput,
	RifleMagsInput,
	SidearmMagsInput,
	RocketsInput,
	MagsWrap,
	Mags,
	DefOutput,
	Output,
	OutputHeader,
	DefUniformOutput,
	TopSwitchWrap,
	TopSwitchBtnL,
	TopSwitchBtnR
} from './misc/components';
import { initData } from './misc/data';
//import * as misc from './misc';
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
		console.log(data);
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
	convertFn = async () => {
		if (await this.validateExp(this.state.ExportArr)) {
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
