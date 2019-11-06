import React from 'react';

import { useOvermind } from '../store';
import { SCa } from '../StyledComponents';

const Checkbox = ({ className, checked, ...props }) => (
	<SCa.CheckboxContainer className={className}>
		<SCa.HiddenCheckbox checked={checked} {...props} />
		<SCa.StyledCheckbox checked={checked}>
			<SCa.Icon viewBox='0 0 24 24'>
				<polyline points='20 6 9 17 4 12' />
			</SCa.Icon>
		</SCa.StyledCheckbox>
	</SCa.CheckboxContainer>
);

const Advanced = () => {
	const { state, actions } = useOvermind();
	const {
		importArr,
		saveImport,
		classes,
		currentSelection,
		additionaloptions,
		sqfExport
	} = state.Advanced;
	return (
		<SCa.AdvancedMainWrap>
			<SCa.InputWrap>
				<SCa.LoadInput
					placeholder={'place ACE export here'}
					onChange={e => actions.textAreaChangeAdv(e)}
					value={importArr}
				/>

				<label>
					<Checkbox checked={saveImport} onChange={() => actions.saveThisimport()} />
					<SCa.CheckboxText>{`Save this input after convertion`}</SCa.CheckboxText>
				</label>

				<SCa.ClassInfoWrap>
					<SCa.ClassInfoHeader>Selected class information</SCa.ClassInfoHeader>
					<SCa.TextHeader>Ingame Class Name:</SCa.TextHeader>
					<SCa.ClassNameInput
						value={
							classes[currentSelection].className
								? classes[currentSelection].className
								: undefined
						}
						onChange={e => actions.handleClassText(e)}
					></SCa.ClassNameInput>
					<SCa.TextHeader>Additional Class Tags:</SCa.TextHeader>
					<SCa.ClassTags
						value={classes[currentSelection].classTags}
						//onChange={e => this.handleText(e, 'class+')}
					></SCa.ClassTags>
				</SCa.ClassInfoWrap>
				<SCa.ClassCheckboxesWrap>
					<SCa.TextHeader>Additional class options:</SCa.TextHeader>
					{Object.keys(additionaloptions).map((i, index) => {
						return (
							<label key={i}>
								{index < 3 ? (
									<React.Fragment>
										<SCa.ClassInfoHeader>
											{additionaloptions[i].fieldName}
										</SCa.ClassInfoHeader>
										<input
											type='number'
											value={additionaloptions[i].amount}
											min='1'
											max={i === 'rifleAmmo' ? 50 : i === 'sidearmAmmo' ? 30 : 15}
											onChange={e => actions.handleNumInput([e.target.value, i, 'amount'])}
										></input>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Checkbox
											checked={classes[currentSelection].classOptions[i]}
											onChange={() => actions.handleCheckboxChange(i)}
										/>
										<SCa.CheckboxText>
											{additionaloptions[i].fieldName}
											{'         '}
										</SCa.CheckboxText>
									</React.Fragment>
								)}
								{additionaloptions[i].type &&
									classes[currentSelection].classOptions[i] && (
										<input
											value={additionaloptions[i].type}
											onChange={e => actions.handleNumInput([e.target.value, i, 'type'])}
										></input>
									)}
							</label>
						);
					})}
				</SCa.ClassCheckboxesWrap>
			</SCa.InputWrap>

			<SCa.ClassManagmentWrap>
				<SCa.SaveToClass onClick={() => actions.advConvert()}>
					convert ACE export and save to the selected class
				</SCa.SaveToClass>

				<SCa.ClassList>
					{Object.keys(classes).map(i => {
						return (
							<SCa.ClassWrap
								key={i}
								selected={classes[i].classOptions.isSelected}
								checked={classes[i].classOptions.isChecked}
								converted={classes[i].classOptions.converted}
								onClick={() => actions.handleClassSelection(i)}
							>
								<label>
									<Checkbox
										checked={classes[i].classOptions.isChecked}
										onChange={e => actions.handleCheckboxChangeClass(e)}
										id={i}
									/>
								</label>
								<SCa.CheckboxTextClass
									checked={classes[i].classOptions.isChecked}
									converted={classes[i].classOptions.converted}
								>
									{classes[i].className}
								</SCa.CheckboxTextClass>
							</SCa.ClassWrap>
						);
					})}
					<SCa.AddNewClass onClick={() => actions.addNewRole()}>
						Add New Class
					</SCa.AddNewClass>
				</SCa.ClassList>
				<SCa.SaveToClass onClick={() => actions.fillAllRolesAtOnce()}>
					fill all selected roles with the current preset
				</SCa.SaveToClass>
			</SCa.ClassManagmentWrap>
			<SCa.AdvOutputWrap>
				Output
				<div>
					<SCa.Btn onClick={() => actions.exportToFile()}>export to file</SCa.Btn>
				</div>
				<SCa.PreOutput>{sqfExport}</SCa.PreOutput>
			</SCa.AdvOutputWrap>
		</SCa.AdvancedMainWrap>
	);
};

export default Advanced;
