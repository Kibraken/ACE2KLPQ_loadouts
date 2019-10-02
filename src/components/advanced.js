import React from 'react';
import styled from 'styled-components';
import { roles, additionaloptionsTemplate } from '../misc/data';
import { ParseLoadout } from '../misc/parsConverter';

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
	CheckboxText
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

class Advanced extends React.Component {
	state = {
		checked: false,
		importArr: '',
		currentSelection: 'squadLeader',
		classes: roles,
		additionaloptions: additionaloptionsTemplate,
		saveImport: false
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
		let id = event.currentTarget.id;
		classes[id].classOptions.isChecked = !classes[id].classOptions.isChecked;
		this.setState({ classes });
	};
	handleClassSelection = (id, index) => {
		let classes = { ...this.state.classes };
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
		try {
			importArr = JSON.parse(importArr);
			if (typeof importArr !== 'object') throw new Error('not an array');
		} catch (error) {
			return console.log('something wrong with the import', error);
		}

		let ammo = {
			RifleMags: additionaloptions.rifleAmmo.amount,
			SidearmMags: additionaloptions.sidearmAmmo.amount,
			RLrockets: additionaloptions.rockets.amount
		};
		const convert = await new ParseLoadout(importArr, ammo);
		classes[currentSelection].classLoadout = await convert.convertFn();
		classes[currentSelection].classOptions.converted = true;
		if (classes[currentSelection].classOptions.nvg)
			classes[currentSelection].classOptions.nvg = additionaloptions.nvg.type;
		if (classes[currentSelection].classOptions.binocular)
			classes[currentSelection].classOptions.binocular =
				additionaloptions.binocular.type;

		if (saveImport === true) {
			this.setState({ classes });
		} else {
			this.setState({ classes, importArr: '' });
		}
	};
	handleText = (event, type) => {
		if (type === 'exp') {
			try {
				this.setState({
					importArr: JSON.parse(JSON.stringify(event.target.value))
				});
			} catch (error) {
				console.log('error in handleText/exp', error);
				this.setState({ importArr: event.target.value });
			}
		}
		if (type === 'class') {
			//todo check for unique name
			let txt = event.target.value;
			let { currentSelection } = this.state;
			let classes = { ...this.state.classes };
			classes[currentSelection].className = txt.length === 0 ? '_' : txt;
			this.setState({ classes });
		}
		//todo additional tags for classes
	};
	addNewRole = () => {
		let classes = { ...this.state.classes };
		let num = Object.keys(classes).length - 11; //bad hardcode, i hope initial length will be static

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
	exportToFile = () => {
		let exportObj = {};
		let classes = { ...this.state.classes };
		Object.keys(classes).some((i, index) => {
			if (classes[i].classOptions.isChecked && !classes[i].classOptions.converted)
				return (
					console.log('not all checked roles has converted loadouts'),
					(exportObj = false),
					true
				);
			if (classes[i].classOptions.isChecked && classes[i].classOptions.converted)
				exportObj = { ...exportObj, [i]: classes[i] };
		});
		console.log('exportObj', exportObj);

		//look here corovan
	};

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
						value={importArr}
					/>

					<label>
						<Checkbox checked={saveImport} onChange={() => this.saveThisimport()} />
						<span>{`Save this input after convertion`}</span>
					</label>
					<Console>Loadout tips, warnings</Console>
					<ClassInfoWrap>
						<ClassInfoHeader>Selected class information</ClassInfoHeader>
						<TextHeader>Ingame Class Name:</TextHeader>
						<ClassNameInput
							value={
								classes[currentSelection].className
									? classes[currentSelection].className
									: undefined
							}
							onChange={e => this.handleText(e, 'class')}
						></ClassNameInput>
						<TextHeader>Additional Class Tags:</TextHeader>
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
												onChange={e => this.handleNumInput(e, i, 'type')}
											></input>
										)}
								</label>
							);
						})}
					</ClassCheckboxesWrap>
				</InputWrap>
				<ClassManagmentWrap>
					<SaveToClass onClick={() => this.advConvert()}>
						convert ACE export and save to the selected class
					</SaveToClass>
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
									<CheckboxText>{classes[i].className}</CheckboxText>
								</ClassWrap>
							);
						})}
						<AddNewClass onClick={() => this.addNewRole()}>Add New Class</AddNewClass>
					</ClassList>
					{/* <DeleteClass onClick={() => console.log('bepis', classes)}>
						DeleteClass
					</DeleteClass> */}
				</ClassManagmentWrap>
				<AdvOutputWrap>
					Output
					<OutputLoadout onClick={() => this.exportToFile()}>
						export to file
					</OutputLoadout>
				</AdvOutputWrap>
			</AdvancedMainWrap>
		);
	}
}

export default Advanced;
