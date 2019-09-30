import React from 'react';
import styled from 'styled-components';
import { roles, additionaloptionsTemplate } from '../misc/data';
export const AdvancedMainWrap = styled.div`
	display: flex;
	flex-direction: row;
`;
export const InputWrap = styled.div`
	width: 350px;
	padding: 20px;
`;
export const ClassManagmentWrap = styled.div`
	width: 350px;
	padding: 20px;
`;
export const OutputWrap = styled.div`
	width: 350px;
	padding: 20px;
`;
export const TextHeader = styled.p`
	margin: 5px;
`;

//InputWrap
export const LoadInput = styled.textarea`
	width: 100%;
	height: 150px;
`;
export const Console = styled.pre`
	width: 100%;
	height: 75px;
	background: #c6b5b5;
`;
export const ClassInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
`;
export const ClassInfoHeader = styled.h5`
	margin: 5px;
`;
export const ClassNameInput = styled.input`
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;
export const ClassTags = styled.input`
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

export const ClassCheckboxesWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

//ClassManagement
export const SaveToClass = styled.button`
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
	background: transparent;
`;

export const ClassList = styled.div`
	width: 75%;
	min-height: 250px;
	background: #83be83;
	display: flex;
	flex-flow: column;
`;
export const ClassWrap = styled.div`
	background: ${props => (props.selected ? 'red' : 'transparent')};
	cursor: pointer;
`;
export const Class = styled.span``;

export const AddNewClass = styled.button`
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
	background: transparent;
`;
export const DeleteClass = styled.button`
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
	background: transparent;
`;

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
const Icon = styled.svg`
	fill: none;
	stroke: white;
	stroke-width: 2px;
`;
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;
const StyledCheckbox = styled.div`
	display: inline-block;
	width: 16px;
	height: 16px;
	background: ${props => (props.checked ? 'salmon' : 'papayawhip')};
	border-radius: 3px;
	transition: all 150ms;
	${Icon} {
		visibility: ${props => (props.checked ? 'visible' : 'hidden')};
	}
`;
const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

class Advanced extends React.Component {
	state = {
		checked: false,
		currentSelection: 'squadLeader',
		classes: roles,
		additionaloptions: additionaloptionsTemplate
	};
	handleCheckboxChange = id => {
		let classes = { ...this.state.classes };
		let { currentSelection } = this.state;
		classes[currentSelection].classOptions[id] = !classes[currentSelection]
			.classOptions[id];

		this.setState({ classes });
	};
	handleCheckboxChangeClass = event => {
		let classes = { ...this.state.classes };
		let id = event.currentTarget.id.split('_')[0];
		classes[id].classOptions.isChecked = !classes[id].classOptions.isChecked;

		this.setState({ classes });
	};
	handleClassSelection = id => {
		let classes = { ...this.state.classes };
		classes[id].classOptions.isSelected = !classes[id].classOptions.isSelected;
		classes[this.state.currentSelection].classOptions.isSelected = false;
		//squadLeader
		this.setState({ currentSelection: id, classes });
	};
	handleNumInput = (event, i, type) => {
		let additionaloptions = { ...this.state.additionaloptions };
		if (type === 'amount') {
			additionaloptions[i][type] =
				event.target.value !== '' ? parseInt(event.target.value) : 1;
		} else {
			additionaloptions[i][type] =
				event.target.value !== '' ? event.target.value : '_';
		}

		this.setState({ additionaloptions });
	};
	render() {
		const { classes, additionaloptions, currentSelection } = this.state;
		return (
			<AdvancedMainWrap>
				<InputWrap>
					<LoadInput placeholder={'place ACE export here'}></LoadInput>
					<Console>Loadout tips, warnings</Console>
					<ClassInfoWrap>
						<ClassInfoHeader>Selected class information</ClassInfoHeader>
						<TextHeader>Class Name</TextHeader>
						<ClassNameInput></ClassNameInput>
						<TextHeader>Class Tags</TextHeader>
						<ClassTags></ClassTags>
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
												onChange={e => this.handleNumInput(e, i, 'amount')}
											></input>
										</React.Fragment>
									) : (
										<React.Fragment>
											<Checkbox
												checked={classes[currentSelection].classOptions[i]}
												onChange={() => this.handleCheckboxChange(i)}
											/>
											<span>{additionaloptions[i].fieldName}</span>
										</React.Fragment>
									)}
									{additionaloptions[i].type &&
										classes[currentSelection].classOptions[i] && (
											<input
												value={additionaloptions[i].type}
												onChange={e => this.handleNumInput(e, i, 'type')}
											></input>
										)}
								</label>
							);
						})}
					</ClassCheckboxesWrap>
				</InputWrap>
				<ClassManagmentWrap>
					<SaveToClass>SaveToClass</SaveToClass>
					<ClassList>
						{Object.keys(classes).map(i => {
							return (
								<ClassWrap
									key={i}
									selected={classes[i].classOptions.isSelected}
									onClick={() => this.handleClassSelection(i)}
								>
									<label>
										<Checkbox
											checked={classes[i].classOptions.isChecked}
											//checked={this.state.classes[i].isSelected}
											onChange={e => this.handleCheckboxChangeClass(e)}
											id={`${i}_checkbox`}
										/>
									</label>
									<Class>{classes[i].className}</Class>
								</ClassWrap>
							);
						})}
						<AddNewClass>AddNewClass</AddNewClass>
					</ClassList>
					<DeleteClass>DeleteClass</DeleteClass>
				</ClassManagmentWrap>
				<OutputWrap>
					Output
					<OutputLoadout>export to file</OutputLoadout>
				</OutputWrap>
			</AdvancedMainWrap>
		);
	}
}

export default Advanced;
