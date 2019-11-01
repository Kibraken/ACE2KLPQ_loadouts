import React from 'react';
import { initData } from './misc/data';
import Basic from './components/basic';
import Advanced from './components/advanced';
import { ParseLoadout } from './misc/parsConverter';
import {
	Wrapper,
	TopSwitchWrap,
	TopSwitchBtnL,
	TopSwitchBtnR
} from './misc/StyledComponents';

class App extends React.Component {
	state = {
		Screen: 'basic',
		BasicConv: {},
		AdvConv: {},
		Loadout: {},
		ExportArr: initData,
		ammo: { RifleMags: 10, SidearmMags: 4, RLrockets: 2 }
	};
	/*
  TODO    
  
  advanced option: randomizing gear?
  UI
   parser for default BIS export
  */

	screenswitch = state => this.setState({ Screen: state });

	basicConvert = async () => {
		const convert = await new ParseLoadout(this.state.ExportArr, this.state.ammo);
		let Loadout = await convert.convertFn();
		this.setState({ Loadout });
	};
	handleText = event => {
		let txt = JSON.parse(event.target.value);
		this.setState({ ExportArr: txt });
	};
	handleNumInput = event => {
		let ammo = { ...this.state.ammo };
		ammo[event.currentTarget.id] =
			event.target.value !== '' ? parseInt(event.target.value) : 1;
		this.setState({ ammo });
	};

	render() {
		const { Screen } = this.state;
		return (
			<Wrapper>
				<TopSwitchWrap>
					<TopSwitchBtnL onClick={() => this.screenswitch('basic')}>
						BASIC
					</TopSwitchBtnL>
					<TopSwitchBtnR onClick={() => this.screenswitch('adv')}>
						ADVANCED
					</TopSwitchBtnR>
				</TopSwitchWrap>
				{Screen === 'basic' ? (
					<Basic
						Loadout={this.state.Loadout}
						ExportArr={this.state.ExportArr}
						ammo={this.state.ammo}
						handleText={this.handleText}
						handleNumInput={this.handleNumInput}
						basicConvert={this.basicConvert}
					/>
				) : (
					<Advanced />
				)}
			</Wrapper>
		);
	}
}

export default App;
