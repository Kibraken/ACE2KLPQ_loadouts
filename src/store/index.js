import state from './state';
import * as actions from './actions';
import * as effects from './effects';

import { createHook } from 'overmind-react';

export const config = {
	state,
	actions,
	effects
};

export const useOvermind = createHook();
