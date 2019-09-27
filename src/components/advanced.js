import React from 'react';
import styled from 'styled-components';
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

const CheckboxNames = [
	'rifle mags',
	'sidearm mags',
	'rockets',
	'mg',
	'gps',
	'nvg',
	'sidearm',
	'binocular',
	'radio sq',
	'radio ft'
];

class Advanced extends React.Component {
	state = {
		checked: false,
		currentSelection: 'squadLeader',
		classes: {
			squadLeader: {
				className: 'officer',
				classTags: ['squad leader'],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: true,
					isChecked: true,
					mgMags: false
				}
			},
			combatLifeSaver: {
				className: 'combat life saver',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			engineer: {
				className: 'engineer',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			teamLeader: {
				className: 'team leader',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			missileSpecialistAT: {
				className: 'missile specialist (at)',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			missileSpecialistAA: {
				className: 'missile specialist (aa)',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			autorifleman: {
				className: 'autorifleman',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			riflemanAT: {
				className: 'rifleman (at)',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			pilot: {
				className: 'pilot',
				classTags: ['helicopter pilot'],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			crewman: {
				className: 'crewman',
				classTags: ['helicopter crew'],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			grenadier: {
				className: 'grenadier',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			},
			rifleman: {
				className: 'rifleman',
				classTags: [],
				classLoadout: {},
				classOptions: {
					binocular: false,
					gps: true,
					radioSq: true,
					radioFt: true,
					isSelected: false,
					isChecked: true,
					mgMags: false
				}
			}
		}
	};
	handleCheckboxChange = event =>
		this.setState({ checked: event.target.checked });
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
	render() {
		const { classes } = this.state;
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
						{CheckboxNames.map(i => {
							return (
								<label key={i}>
									<Checkbox
										checked={this.state.checked}
										onChange={this.handleCheckboxChange}
									/>
									<span>{i}</span>
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

//Rifleman:{ Rifle:[], Handgun:[], Launcher:[], Uniform:[], classname:"",tags:["",""], optional:{binocular:"binName",gps:true, mgMags:3} },
