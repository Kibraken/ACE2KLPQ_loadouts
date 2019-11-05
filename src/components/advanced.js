import React from 'react';
import styled from 'styled-components';
import { useOvermind } from '../store';

import {
	AdvancedMainWrap,
	InputWrap,
	ClassManagmentWrap,
	AdvOutputWrap,
	TextHeader,
	LoadInput,
	Console,
	ClassInfoWrap,
	ClassInfoHeader,
	ClassNameInput,
	ClassTags,
	ClassCheckboxesWrap,
	SaveToClass,
	ClassList,
	ClassWrap,
	AddNewClass,
	DeleteClass,
	Icon,
	HiddenCheckbox,
	StyledCheckbox,
	CheckboxContainer,
	CheckboxText,
	PreOutput,
	CheckboxTextClass,
	Btn
} from '../misc/components';

//output shite

export const OutputLoadout = styled.button``;
//custom checkboxes
const Checkbox = ({ className, checked, ...props }) => (
	<CheckboxContainer className={className}>
		<HiddenCheckbox checked={checked} {...props} />
		<StyledCheckbox checked={checked}>
			<Icon viewBox='0 0 24 24'>
				<polyline points='20 6 9 17 4 12' />
			</Icon>
		</StyledCheckbox>
	</CheckboxContainer>
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
		<AdvancedMainWrap>
			<InputWrap>
				<LoadInput
					placeholder={'place ACE export here'}
					onChange={e => actions.textAreaChangeAdv(e)}
					value={importArr}
				/>

				<label>
					<Checkbox checked={saveImport} onChange={() => actions.saveThisimport()} />
					<CheckboxText>{`Save this input after convertion`}</CheckboxText>
				</label>
				{/* <Console>Loadout tips, warnings</Console> */}
				<ClassInfoWrap>
					<ClassInfoHeader>Selected class information</ClassInfoHeader>
					<TextHeader>Ingame Class Name:</TextHeader>
					<ClassNameInput
						value={
							classes[currentSelection].className
								? classes[currentSelection].className
								: undefined
						}
						onChange={e => actions.handleClassText(e)}
					></ClassNameInput>
					<TextHeader>Additional Class Tags:</TextHeader>
					<ClassTags
						value={classes[currentSelection].classTags}
						//onChange={e => this.handleText(e, 'class+')}
					></ClassTags>
				</ClassInfoWrap>
				<ClassCheckboxesWrap>
					<TextHeader>Additional class options:</TextHeader>
					{Object.keys(additionaloptions).map((i, index) => {
						return (
							<label key={i}>
								{index < 3 ? (
									<React.Fragment>
										<ClassInfoHeader>{additionaloptions[i].fieldName}</ClassInfoHeader>
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
										<CheckboxText>
											{additionaloptions[i].fieldName}
											{'         '}
										</CheckboxText>
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
				</ClassCheckboxesWrap>
			</InputWrap>
			<ClassManagmentWrap>
				<SaveToClass onClick={() => actions.advConvert()}>
					convert ACE export and save to the selected class
				</SaveToClass>
				<ClassList>
					{Object.keys(classes).map(i => {
						return (
							<ClassWrap
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
								<CheckboxTextClass
									checked={classes[i].classOptions.isChecked}
									converted={classes[i].classOptions.converted}
								>
									{classes[i].className}
								</CheckboxTextClass>
							</ClassWrap>
						);
					})}
					<AddNewClass onClick={() => actions.addNewRole()}>
						Add New Class
					</AddNewClass>
				</ClassList>
			</ClassManagmentWrap>
			<AdvOutputWrap>
				Output
				<div>
					<Btn onClick={() => actions.exportToFile()}>export to file</Btn>
					<Btn onClick={() => actions.fillAllRolesAtOnce()}>fill all roles</Btn>
				</div>
				<PreOutput>{sqfExport}</PreOutput>
			</AdvOutputWrap>
		</AdvancedMainWrap>
	);
};

export default Advanced;
