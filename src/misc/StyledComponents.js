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
