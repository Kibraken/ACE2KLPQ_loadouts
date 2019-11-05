import React from 'react';
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
	OutputHeader,
	BasicLbl,
	BasicConvertBtn
} from '../misc/StyledComponents';
import { useOvermind } from '../store';

//todo: refactor mags and output into reusable components

const Basic = () => {
	const { state, actions } = useOvermind();

	return (
		<BasicWrapper>
			<DefaultInput onChange={actions.textAreaChange}>
				{JSON.stringify(state.Basic.ExportArr)}
			</DefaultInput>

			<Mags>
				<MagsWrap>
					<BasicLbl htmlFor='RifleMags'>Rifle Mags</BasicLbl>
					<RifleMagsInput
						type='number'
						id='RifleMags'
						value={state.Basic.ammo.RifleMags}
						min='1'
						max='50'
						onChange={e => actions.magsChange(e)}
					></RifleMagsInput>
				</MagsWrap>
				<MagsWrap>
					<BasicLbl htmlFor='SidearmMags'>Sidearm Mags</BasicLbl>
					<SidearmMagsInput
						type='number'
						id='SidearmMags'
						value={state.Basic.ammo.SidearmMags}
						min='1'
						max='30'
						onChange={e => actions.magsChange(e)}
					></SidearmMagsInput>
				</MagsWrap>
				<MagsWrap>
					<BasicLbl htmlFor='RLrockets'>RL rockets</BasicLbl>
					<RocketsInput
						type='number'
						id='RLrockets'
						value={state.Basic.ammo.RLrockets}
						min='1'
						max='15'
						onChange={e => actions.magsChange(e)}
					></RocketsInput>
				</MagsWrap>
			</Mags>

			<br />
			<BasicConvertBtn onClick={actions.basicConvert}>convert</BasicConvertBtn>

			<br />
			<OutputWrap>
				<Output>
					<OutputHeader>Rifle</OutputHeader>
					<DefOutput>
						{state.Basic.Loadout.newRifle !== undefined &&
							state.Basic.Loadout.newRifle.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newRifle) + `;`}
					</DefOutput>
				</Output>
				<Output>
					<OutputHeader>Secondary (Launcher)</OutputHeader>
					<DefOutput>
						{state.Basic.Loadout.newLauncher !== undefined &&
							state.Basic.Loadout.newLauncher.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newLauncher) + `;`}
					</DefOutput>
				</Output>
				<Output>
					<OutputHeader>Handgun</OutputHeader>
					<DefOutput>
						{state.Basic.Loadout.newHandgun !== undefined &&
							state.Basic.Loadout.newHandgun.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newHandgun) + `;`}
					</DefOutput>
				</Output>
				<Output>
					<OutputHeader>Uniform</OutputHeader>
					<DefOutput>
						{state.Basic.Loadout.newUniform !== undefined &&
							state.Basic.Loadout.newUniform.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newUniform) + `;`}
					</DefOutput>
				</Output>
			</OutputWrap>
		</BasicWrapper>
	);
};

export default Basic;
