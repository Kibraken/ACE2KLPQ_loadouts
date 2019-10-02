import styled from 'styled-components';
export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
export const BasicWrapper = styled.div`
	background: tomato;
`;
export const AdvWrapper = styled.div``;
export const OutputWrap = styled.div`
	height: 180px;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	padding-left: 10px;
	width: fit-content;
`;
export const DefaultInput = styled.textarea`
	width: 99.6%;
	height: 150px;
	margin-top: 15px;
`;
export const RifleMagsInput = styled.input`
	width: 35px;
`;
export const SidearmMagsInput = styled.input`
	width: 35px;
`;
export const RocketsInput = styled.input`
	width: 35px;
`;
export const MagsWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 150px;
`;
export const Mags = styled.div`
	margin-left: 20px;
`;

export const DefOutput = styled.pre`
	background: transparent;
	height: 20px;
	width: 100%;
	display: table-cell;
	vertical-align: middle;
	padding-left: 5px;
	font-weight: 400;
`;
export const Output = styled.div`
	display: 'flex';
	flex-flow: column;
	height: 42px;
	width: 100%;
`;
export const OutputHeader = styled.div`
	font-weight: 600;
`;
export const DefUniformOutput = styled.pre``;

export const TopSwitchWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 150px;
`;
export const TopSwitchBtnL = styled.div`
	font-weight: 900;
	background: tomato;
	cursor: pointer;
	border: 1px solid black;
	border-bottom: none;
`;
export const TopSwitchBtnR = styled.div`
	font-weight: 900;
	background: transparent;
	cursor: pointer;
	border: 1px solid black;
	border-bottom: none;
`;

//adv

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
export const AdvOutputWrap = styled.div`
	width: 350px;
	padding: 20px;
`;
export const TextHeader = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 14px;
	padding-left: 5px;
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
	margin: 0.2em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;
export const ClassTags = styled.input`
	color: palevioletred;
	font-size: 1em;
	margin: 0.2em;
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
	/* width: 75%; */
	min-height: 250px;
	background: #fbf3ff;
	display: flex;
	flex-flow: column;
	padding: 20px;
	border: 2px solid palevioletred;
	border-radius: 12px;
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

export const Icon = styled.svg`
	fill: none;
	stroke: white;
	stroke-width: 2px;
`;
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
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
export const StyledCheckbox = styled.div`
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
export const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
`;
export const CheckboxText = styled.span`
	padding-left: 5px;
	font-weight: 500;
`;
