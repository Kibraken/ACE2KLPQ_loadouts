import React from 'react';
import Basic from './components/basic';
import Advanced from './components/advanced';

import { SCapp } from './StyledComponents';
import { useOvermind } from './store';

const App = () => {
	const { state, actions } = useOvermind();

	return (
		<SCapp.Wrapper>
			<SCapp.TopSwitchWrap>
				<SCapp.TopSwitchBtnL
					onClick={() => actions.switchScreen('Basic')}
					active={state.Screen}
				>
					BASIC
				</SCapp.TopSwitchBtnL>
				<SCapp.TopSwitchBtnR
					onClick={() => actions.switchScreen('Advanced')}
					active={state.Screen}
				>
					ADVANCED
				</SCapp.TopSwitchBtnR>
			</SCapp.TopSwitchWrap>

			{state.Screen === 'Basic' ? <Basic /> : <Advanced />}
		</SCapp.Wrapper>
	);
};

export default App;
