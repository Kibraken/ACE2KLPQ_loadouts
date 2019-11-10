import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	max-width: 1850px;
`;

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
	color: ${props => (props.active === 'Basic' ? '#a4dfaa' : 'white')};
	border-bottom: ${props =>
		props.active === 'Basic' ? 'none' : '1px solid white'};
	background: ${props => (props.active === 'Basic' ? '#02040c' : 'transparent')};
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
	color: ${props => (props.active === 'Advanced' ? '#a4dfaa' : 'white')};
	border-bottom: ${props =>
		props.active === 'Advanced' ? 'none' : '1px solid white'};
	background: ${props =>
		props.active === 'Advanced' ? '#02040c' : 'transparent'};
`;
