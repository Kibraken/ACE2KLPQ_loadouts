import styled from 'styled-components';
export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
export const BasicWrapper = styled.div`
	background: #02040c;
	border: 1px solid white;
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
	color: white;
`;
export const Output = styled.div`
	display: 'flex';
	flex-flow: column;
	height: 42px;
	width: 100%;
`;
export const OutputHeader = styled.div`
	font-weight: 600;
	color: white;
`;
export const DefUniformOutput = styled.pre``;

export const TopSwitchWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 150px;
`;
export const TopSwitchBtnL = styled.div`
	font-weight: 900;
	background: #02040c;
	cursor: pointer;
	border: 1px solid white;
	padding-left: 5px;
	padding-right: 5px;
	margin-bottom: -1px;
	z-index: 5;
	color: ${props => (props.active === 'basic' ? '#a4dfaa' : 'white')};
	border-bottom: ${props =>
		props.active === 'basic' ? 'none' : '1px solid white'};
	background: ${props => (props.active === 'basic' ? '#02040c' : 'transparent')};
`;
export const TopSwitchBtnR = styled.div`
	font-weight: 900;
	background: #02040c;
	cursor: pointer;
	border: 1px solid white;
	padding-left: 5px;
	padding-right: 5px;
	margin-bottom: -1px;
	z-index: 5;
	color: ${props => (props.active === 'adv' ? '#a4dfaa' : 'white')};
	border-bottom: ${props =>
		props.active === 'adv' ? 'none' : '1px solid white'};
	background: ${props => (props.active === 'adv' ? '#02040c' : 'transparent')};
`;

export const BasicLbl = styled.label`
	color: white;
`;

export const BasicConvertBtn = styled.button`
	color: whitesmoke;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid whitesmoke;
	border-radius: 3px;
	background: transparent;
`;
