import { state } from './state';
import * as actions from './actions';
import { createOvermind } from 'overmind';

import { createHook } from 'overmind-react';

export const config = createOvermind(
	{
		state,
		actions: {
			changeShowCount: ({ value: event, state }) => {
				state.test = event;
			}
		}
	},

	{ devtools: true }
);

export const useOvermind = createHook();
