import React from 'react';
import { SCb } from '../StyledComponents';
import { useOvermind } from '../store';

//todo: refactor mags and output into reusable components

const Basic = () => {
	const { state, actions } = useOvermind();
	return (
		<SCb.BasicWrapper>
			<SCb.DefaultInput onChange={actions.textAreaChangeBasic}>
				{JSON.stringify(state.Basic.ExportArr)}
			</SCb.DefaultInput>

			<SCb.Mags>
				<SCb.MagsWrap>
					<SCb.BasicLbl htmlFor='RifleMags'>Rifle Mags</SCb.BasicLbl>
					<SCb.RifleMagsInput
						type='number'
						id='RifleMags'
						value={state.Basic.ammo.RifleMags}
						min='1'
						max='50'
						onChange={e => actions.magsChange(e)}
					></SCb.RifleMagsInput>
				</SCb.MagsWrap>
				<SCb.MagsWrap>
					<SCb.BasicLbl htmlFor='SidearmMags'>Sidearm Mags</SCb.BasicLbl>
					<SCb.SidearmMagsInput
						type='number'
						id='SidearmMags'
						value={state.Basic.ammo.SidearmMags}
						min='1'
						max='30'
						onChange={e => actions.magsChange(e)}
					></SCb.SidearmMagsInput>
				</SCb.MagsWrap>
				<SCb.MagsWrap>
					<SCb.BasicLbl htmlFor='RLrockets'>RL rockets</SCb.BasicLbl>
					<SCb.RocketsInput
						type='number'
						id='RLrockets'
						value={state.Basic.ammo.RLrockets}
						min='1'
						max='15'
						onChange={e => actions.magsChange(e)}
					></SCb.RocketsInput>
				</SCb.MagsWrap>
			</SCb.Mags>

			<br />
			<SCb.BasicConvertBtn onClick={actions.basicConvert}>
				convert
			</SCb.BasicConvertBtn>

			<br />
			<SCb.OutputWrap>
				<SCb.Output>
					<SCb.OutputHeader>Rifle</SCb.OutputHeader>
					<SCb.DefOutput>
						{state.Basic.Loadout.newRifle !== undefined &&
							state.Basic.Loadout.newRifle.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newRifle) + `;`}
					</SCb.DefOutput>
				</SCb.Output>
				<SCb.Output>
					<SCb.OutputHeader>Secondary (Launcher)</SCb.OutputHeader>
					<SCb.DefOutput>
						{state.Basic.Loadout.newLauncher !== undefined &&
							state.Basic.Loadout.newLauncher.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newLauncher) + `;`}
					</SCb.DefOutput>
				</SCb.Output>
				<SCb.Output>
					<SCb.OutputHeader>Handgun</SCb.OutputHeader>
					<SCb.DefOutput>
						{state.Basic.Loadout.newHandgun !== undefined &&
							state.Basic.Loadout.newHandgun.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newHandgun) + `;`}
					</SCb.DefOutput>
				</SCb.Output>
				<SCb.Output>
					<SCb.OutputHeader>Uniform</SCb.OutputHeader>
					<SCb.DefOutput>
						{state.Basic.Loadout.newUniform !== undefined &&
							state.Basic.Loadout.newUniform.length !== 0 &&
							JSON.stringify(state.Basic.Loadout.newUniform) + `;`}
					</SCb.DefOutput>
				</SCb.Output>
			</SCb.OutputWrap>
		</SCb.BasicWrapper>
	);
};

export default Basic;
