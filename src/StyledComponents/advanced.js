import styled from 'styled-components';
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle';
import { MinusCircle } from 'styled-icons/boxicons-solid/MinusCircle';

//adv

export const AdvancedMainWrap = styled.div`
	display: flex;
	flex-direction: row;
	/* colors */
	/* background: #0b1022; */
	background: #02040c;
	border: 1px solid white;
`;
export const InputWrap = styled.div`
	width: 350px;
	padding: 20px;
`;
export const ClassManagmentWrap = styled.div`
	width: 350px;
	padding: 20px;
	height: fit-content;
`;
export const AdvOutputWrap = styled.div`
	max-width: 1018px;
	min-width: 900px;
	padding: 20px;
`;
export const TextHeader = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 14px;
	padding-left: 5px;
	/* colors */
	color: white;
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
	/* colors */
	color: white;
`;
export const ClassNameInput = styled.input`
	color: black;
	font-size: 1em;
	margin: 0.2em;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
	border-radius: 3px;
`;
export const ClassTags = styled.input`
	color: black;
	font-size: 1em;
	margin: 0.2em;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
	border-radius: 3px;
`;

export const ClassCheckboxesWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

//ClassManagement
export const SaveToClass = styled.button`
	color: whitesmoke;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
	border-radius: 3px;
	background: transparent;
`;

export const ClassList = styled.div`
	/* width: 75%; */
	min-height: 250px;
	/* background: #fbf3ff; */
	background: #02040c;
	display: flex;
	flex-flow: column;
	padding: 20px;
	border: 2px solid whitesmoke;
	border-radius: 12px;
`;
export const ClassWrap = styled.div`
	background: ${props => (props.selected ? 'orange' : 'transparent')};
	cursor: pointer;
`;

export const AddNewClass = styled.button`
	color: whitesmoke;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
	border-radius: 3px;
	background: transparent;
`;
export const DeleteClass = styled.button`
	color: whitesmoke;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
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
	/* colors */
	color: white;
`;
export const PreOutput = styled.pre`
	padding: 20px;
	font-weight: 900;
	background: #0c0c0d;
	font-size: 0.9em;
	/* max-width: 1000px; */
	overflow: scroll;
	/* min-width: 900px; */
	color: #f0e7e7;
	height: 1000px;
	width: 100%;
`;

export const CheckboxTextClass = styled.span`
	padding-left: 5px;
	font-weight: 500;
	/* colors */
	color: ${props =>
		props.converted ? 'green' : !props.checked ? '#b54848' : 'white'};
`;

export const Btn = styled.button`
	color: whitesmoke;
	font-size: 1em;
	margin: 1px;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
	border-radius: 3px;
	background: transparent;
`;

export const Plus = styled(PlusCircle)`
	margin-top: 15px;
	color: white;
	cursor: pointer;
`;
export const Minus = styled(MinusCircle)`
	margin-top: 15px;
	color: white;
	cursor: pointer;
`;
