import React, { Component } from 'react';
import {
	BasicWrapper,
	OutputWrap,
	DefaultInput,
	RifleMagsInput,
	SidearmMagsInput,
	RocketsInput,
	MagsWrap,
	Mags,
	DefOutput,
	Output,
	OutputHeader
} from '../misc/StyledComponents';
import { useOvermind } from '../store';

const Basic = () => {
	const { state, actions } = useOvermind();

	return (
		<BasicWrapper>
			{/* <DefaultInput onChange={props.handleText}>
				{JSON.stringify(props.ExportArr)}
			</DefaultInput> */}

			<Mags>
				<MagsWrap>
					<label htmlFor='RifleMags'>Rifle Mags</label>
					<RifleMagsInput
						type='number'
						id='RifleMags'
						value={state.Basic.ammo.RifleMags}
						min='1'
						max='50'
						onChange={actions.changeShowCount}
					></RifleMagsInput>
				</MagsWrap>
				{/* <MagsWrap>
					<label htmlFor='SidearmMags'>Sidearm Mags</label>
					<SidearmMagsInput
						type='number'
						id='SidearmMags'
						value={props.ammo.SidearmMags}
						min='1'
						max='30'
						onChange={e => props.handleNumInput(e)}
					></SidearmMagsInput>
				</MagsWrap>
				<MagsWrap>
					<label htmlFor='RLrockets'>RL rockets</label>
					<RocketsInput
						type='number'
						id='RLrockets'
						value={props.ammo.RLrockets}
						min='1'
						max='15'
						onChange={e => props.handleNumInput(e)}
					></RocketsInput>
				</MagsWrap> */}
			</Mags>

			{/* <br />
			<button onClick={props.basicConvert}>convert</button>

			<br />
			<OutputWrap>
				<Output>
					<OutputHeader>Rifle</OutputHeader>
					<DefOutput>
						{props.Loadout.newRifle !== undefined &&
							props.Loadout.newRifle.length !== 0 &&
							JSON.stringify(props.Loadout.newRifle) + `;`}
					</DefOutput>
				</Output>
				<Output>
					<OutputHeader>Secondary (Launcher)</OutputHeader>
					<DefOutput>
						{props.Loadout.newLauncher !== undefined &&
							props.Loadout.newLauncher.length !== 0 &&
							JSON.stringify(props.Loadout.newLauncher) + `;`}
					</DefOutput>
				</Output>
				<Output>
					<OutputHeader>Handgun</OutputHeader>
					<DefOutput>
						{props.Loadout.newHandgun !== undefined &&
							props.Loadout.newHandgun.length !== 0 &&
							JSON.stringify(props.Loadout.newHandgun) + `;`}
					</DefOutput>
				</Output>
				<Output>
					<OutputHeader>Uniform</OutputHeader>
					<DefOutput>
						{props.Loadout.newUniform !== undefined &&
							props.Loadout.newUniform.length !== 0 &&
							JSON.stringify(props.Loadout.newUniform) + `;`}
					</DefOutput>
				</Output>
			</OutputWrap> */}
		</BasicWrapper>
	);
};

export default Basic;
