import React from 'react';
import Basic from './components/basic';
import Advanced from './components/advanced';

import {
	Wrapper,
	TopSwitchWrap,
	TopSwitchBtnL,
	TopSwitchBtnR
} from './misc/StyledComponents';
import { useOvermind } from './store';

const App = () => {
	const { state, actions } = useOvermind();

	return (
		<Wrapper>
			<TopSwitchWrap>
				<TopSwitchBtnL
					onClick={() => actions.switchScreen('basic')}
					active={state.Screen}
				>
					BASIC
				</TopSwitchBtnL>
				<TopSwitchBtnR
					onClick={() => actions.switchScreen('adv')}
					active={state.Screen}
				>
					ADVANCED
				</TopSwitchBtnR>
			</TopSwitchWrap>

			{state.Screen === 'basic' ? <Basic /> : <Advanced />}
		</Wrapper>
	);
};

export default App;
