import React from 'react';
import styled from 'styled-components';
import { roles, additionaloptionsTemplate } from '../misc/data';
import { ParseLoadout } from '../misc/parsConverter';

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
	background: ${props =>
		props.converted && props.selected
			? '#4fd20c'
			: props.selected
			? 'orange'
			: props.converted
			? 'green'
			: !props.checked
			? 'gray'
			: 'transparent'};
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
		importArr: false,
		currentSelection: 'squadLeader',
		classes: roles,
		additionaloptions: additionaloptionsTemplate,
		saveImport: false
	};
	//TODO: checkbox "keep this export after convertion"
	handleCheckboxChange = id => {
		let classes = { ...this.state.classes };
		let { currentSelection } = this.state;
		classes[currentSelection].classOptions[id] = !classes[currentSelection]
			.classOptions[id];
		this.setState({ classes });
	};
	handleCheckboxChangeClass = event => {
		let classes = { ...this.state.classes };
		//let id = event.currentTarget.id.split('_')[0];
		let id = event.currentTarget.id;
		classes[id].classOptions.isChecked = !classes[id].classOptions.isChecked;
		this.setState({ classes });
	};
	handleClassSelection = (id, index) => {
		let classes = { ...this.state.classes };
		//classes[id].classOptions.isSelected = !classes[id].classOptions.isSelected;
		classes[id].classOptions.isSelected = true;
		classes[this.state.currentSelection].classOptions.isSelected = false;
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
	advConvert = async () => {
		let classes = { ...this.state.classes };
		let {
			additionaloptions,
			importArr,
			currentSelection,
			saveImport
		} = this.state;
		if (importArr === false) {
			return console.log('ebanulsya?');
		}
		let ammo = {
			RifleMags: additionaloptions.rifleAmmo.amount,
			SidearmMags: additionaloptions.sidearmAmmo.amount,
			RLrockets: additionaloptions.rockets.amount
		};
		const convert = await new ParseLoadout(importArr, ammo);
		classes[currentSelection].classLoadout = await convert.convertFn();
		classes[currentSelection].classOptions.converted = true;
		if (saveImport === true) {
			this.setState({ classes });
		} else {
			this.setState({ classes, importArr: false });
		}
	};
	handleText = (event, type) => {
		if (type === 'exp') {
			let txt = JSON.parse(event.target.value);
			this.setState({ importArr: txt });
		}
		if (type === 'class') {
			//todo check for unique name
			let txt = event.target.value;
			let { currentSelection } = this.state;
			let classes = { ...this.state.classes };
			classes[currentSelection].className = txt.length === 0 ? '_' : txt;
			this.setState({ classes });
		}
		// if (type === 'class+') {
		// 	let txt = JSON.parse(event.target.value);
		// 	let { currentSelection } = this.state;
		// 	let classes = { ...this.state.classes };

		// тупо, по букве в массив наверное будет засовывать, перепилить нужно
		// 	classes[currentSelection].classTags = [
		// 		...classes[currentSelection].classTags,
		// 		txt
		// 	];
		// 	this.setState({ classes });
		// }
	};
	addNewRole = () => {
		let classes = { ...this.state.classes };
		let num = Object.keys(classes).length - 11;
		classes[`CustomRole${num}`] = {
			className: '',
			classTags: [],
			classLoadout: {},
			classOptions: {
				binocular: false,
				gps: true,
				radioSq: true,
				radioFt: true,
				isSelected: false,
				isChecked: true,
				mgMags: false,
				converted: false,
				nvg: false,
				map: false,
				compass: false
			}
		};
		classes[`CustomRole${num}`].className = `CustomRole${num}`;
		this.setState({ classes });
	};
	saveThisimport = () => this.setState({ saveImport: !this.state.saveImport });
	exportToFile = () => {};

	render() {
		const {
			classes,
			additionaloptions,
			currentSelection,
			importArr,
			saveImport
		} = this.state;

		return (
			<AdvancedMainWrap>
				<InputWrap>
					<LoadInput
						placeholder={'place ACE export here'}
						onChange={e => this.handleText(e, 'exp')}
						value={importArr ? JSON.stringify(importArr) : undefined}
					>
						{/* {importArr !== false && JSON.stringify(importArr)} */}
					</LoadInput>
					<label>
						<Checkbox checked={saveImport} onChange={() => this.saveThisimport()} />
						<span>{`Save this input after convertion`}</span>
					</label>
					<Console>Loadout tips, warnings</Console>
					<ClassInfoWrap>
						<ClassInfoHeader>Selected class information</ClassInfoHeader>
						<TextHeader>Class Name</TextHeader>
						<ClassNameInput
							value={
								classes[currentSelection].className
									? classes[currentSelection].className
									: undefined
							}
							onChange={e => this.handleText(e, 'class')}
						></ClassNameInput>
						<TextHeader>Class Tags</TextHeader>
						<ClassTags
							value={classes[currentSelection].classTags}
							onChange={e => this.handleText(e, 'class+')}
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
					<SaveToClass onClick={() => this.advConvert()}>SaveToClass</SaveToClass>
					<ClassList>
						{Object.keys(classes).map((i, index) => {
							return (
								<ClassWrap
									key={i}
									selected={classes[i].classOptions.isSelected}
									checked={classes[i].classOptions.isChecked}
									converted={classes[i].classOptions.converted}
									onClick={() => this.handleClassSelection(i, index)}
								>
									<label>
										<Checkbox
											checked={classes[i].classOptions.isChecked}
											//checked={this.state.classes[i].isSelected}
											onChange={e => this.handleCheckboxChangeClass(e)}
											//id={`${i}_checkbox`}
											id={i}
										/>
									</label>
									<Class>{classes[i].className}</Class>
								</ClassWrap>
							);
						})}
						<AddNewClass onClick={() => this.addNewRole()}>AddNewClass</AddNewClass>
					</ClassList>
					<DeleteClass onClick={() => console.log('bepis', classes)}>
						DeleteClass
					</DeleteClass>
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
