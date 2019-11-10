import React from 'react';
import { useOvermind } from '../../store';
import Rodal from 'rodal';
import './rodal.css';
import { SCm } from '../../StyledComponents';

const timeParse = time =>
	`${time.split('T')[0]} ${time.split('T')[1].split('.')[0]}`;

const ModalDb = () => {
	const { state, actions } = useOvermind();
	return state.modalType === 'save' ? (
		<Rodal
			visible={state.isModalOpen}
			onClose={actions.modalClose}
			customStyles={{ background: '#393b3b' }}
			width={500}
			height={150}
		>
			<SCm.ModalSaveWrap>
				<SCm.Mtitlewrap save={true}>save current loadout</SCm.Mtitlewrap>
				<SCm.InputsWrap>
					<SCm.InputContainer>
						<SCm.InputTitle>username</SCm.InputTitle>
						<SCm.Saveinput
							onChange={e => actions.handleDbText(e)}
							value={state.user_name}
							id='user_name'
							err={state.err['user_name']}
						></SCm.Saveinput>
						<SCm.ErrMasg>
							{state.err['user_name'] && state.err['user_name']}
						</SCm.ErrMasg>
					</SCm.InputContainer>
					<SCm.InputContainer>
						<SCm.InputTitle>load name</SCm.InputTitle>
						<SCm.Saveinput
							value={state.loadout_name}
							id='loadout_name'
							err={state.err['loadout_name']}
							onChange={e => actions.handleDbText(e)}
						></SCm.Saveinput>
						<SCm.ErrMasg>
							{state.err['loadout_name'] && state.err['loadout_name']}
						</SCm.ErrMasg>
					</SCm.InputContainer>
				</SCm.InputsWrap>
				<SCm.SaveBtnContainer>
					<SCm.ButtonLoad onClick={actions.dbSave}>save</SCm.ButtonLoad>
					<SCm.ButtonLoad onClick={actions.modalClose}>cancel</SCm.ButtonLoad>
				</SCm.SaveBtnContainer>
			</SCm.ModalSaveWrap>
		</Rodal>
	) : (
		<Rodal
			visible={state.isModalOpen}
			onClose={actions.modalClose}
			customStyles={{ background: '#393b3b' }}
			width={900}
			height={500}
		>
			<SCm.ModalWrap>
				<SCm.Mtitlewrap>
					load saved loadout for {state.Screen} converter
				</SCm.Mtitlewrap>
				<SCm.TitleWrap>
					<SCm.ListItem>
						<SCm.ListField>user name</SCm.ListField>
						<SCm.ListField>type</SCm.ListField>
						<SCm.ListField>loadout_name</SCm.ListField>
						<SCm.ListField>created</SCm.ListField>
					</SCm.ListItem>
				</SCm.TitleWrap>
				{state.saved_loadouts.length < 1 ? (
					<SCm.Loader>
						<SCm.DotWrapper>
							<SCm.Dot delay='0s' />
							<SCm.Dot delay='.1s' />
							<SCm.Dot delay='.2s' />
						</SCm.DotWrapper>
					</SCm.Loader>
				) : (
					<SCm.ListWrap>
						{state.saved_loadouts.map(i => {
							if (i.loadout_type !== state.Screen) return;
							return (
								<SCm.ListItem
									key={i._id}
									selective={true}
									selected={state.dbSelected === i._id}
									onClick={() => actions.dbSelected(i._id)}
								>
									<SCm.ListField>{i.user_name}</SCm.ListField>
									<SCm.ListField>{i.loadout_type}</SCm.ListField>
									<SCm.ListField>{i.loadout_name}</SCm.ListField>
									<SCm.ListField>{timeParse(i.created)}</SCm.ListField>
									{state.dbSelected === i._id && (
										<SCm.BtnContainer>
											<SCm.ButtonLoad onClick={() => actions.loadSelected()}>
												load
											</SCm.ButtonLoad>

											<SCm.ButtonLoad onClick={() => actions.cancelSelection()}>
												cancel
											</SCm.ButtonLoad>
										</SCm.BtnContainer>
									)}
								</SCm.ListItem>
							);
						})}
					</SCm.ListWrap>
				)}
			</SCm.ModalWrap>
		</Rodal>
	);
};
export default ModalDb;
