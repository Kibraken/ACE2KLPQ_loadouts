import React from 'react';
import { SCb } from '../StyledComponents';
import { useOvermind } from '../store';
import ModalDb from '../components/modal/modal';

const Basic = () => {
	const { state, actions } = useOvermind();
	const { ExportArr, ammo, Loadout } = state.Basic;
	return (
		<SCb.BasicWrapper>
			<SCb.MdBtnWrap>
				<SCb.BasicConvertBtn onClick={() => actions.modal('save')}>
					save current loadout
				</SCb.BasicConvertBtn>
				<SCb.BasicConvertBtn onClick={() => actions.modal('load')}>
					load saved loadout
				</SCb.BasicConvertBtn>
			</SCb.MdBtnWrap>
			<SCb.DefaultInput
				placeholder={'place ACE export here'}
				onChange={e => actions.textAreaChangeBasic(e)}
				value={ExportArr}
			></SCb.DefaultInput>
			<ModalDb />
			<SCb.Mags>
				<SCb.MagsWrap>
					<SCb.BasicLbl htmlFor='RifleMags'>Rifle Mags</SCb.BasicLbl>
					<SCb.RifleMagsInput
						type='number'
						id='RifleMags'
						value={ammo.RifleMags}
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
						value={ammo.SidearmMags}
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
						value={ammo.RLrockets}
						min='1'
						max='15'
						onChange={e => actions.magsChange(e)}
					></SCb.RocketsInput>
				</SCb.MagsWrap>
			</SCb.Mags>

			<SCb.BasicConvertBtn onClick={actions.basicConvert}>
				convert
			</SCb.BasicConvertBtn>
			{Object.keys(Loadout).length > 0 && (
				<SCb.OutputWrap>
					{Loadout.newRifle !== undefined && Loadout.newRifle.length !== 0 && (
						<SCb.Output>
							<SCb.OutputHeader>Rifle</SCb.OutputHeader>
							<SCb.DefOutput>JSON.stringify(Loadout.newRifle) + `;`}</SCb.DefOutput>
						</SCb.Output>
					)}
					{Loadout.newLauncher !== undefined && Loadout.newLauncher.length !== 0 && (
						<SCb.Output>
							<SCb.OutputHeader>Secondary (Launcher)</SCb.OutputHeader>
							<SCb.DefOutput>
								{JSON.stringify(Loadout.newLauncher) + `;`}
							</SCb.DefOutput>
						</SCb.Output>
					)}
					{Loadout.newHandgun !== undefined && Loadout.newHandgun.length !== 0 && (
						<SCb.Output>
							<SCb.OutputHeader>Handgun</SCb.OutputHeader>
							<SCb.DefOutput>{JSON.stringify(Loadout.newHandgun) + `;`}</SCb.DefOutput>
						</SCb.Output>
					)}
					{Loadout.newUniform !== undefined && Loadout.newUniform.length !== 0 && (
						<SCb.Output>
							<SCb.OutputHeader>Uniform</SCb.OutputHeader>
							<SCb.DefOutput>{JSON.stringify(Loadout.newUniform) + `;`}</SCb.DefOutput>
						</SCb.Output>
					)}
				</SCb.OutputWrap>
			)}
		</SCb.BasicWrapper>
	);
};

export default Basic;
