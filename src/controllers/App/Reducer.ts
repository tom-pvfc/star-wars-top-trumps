import { TYPES } from './Actions';
import { AppInitState } from './StateAndProps';
import { merge } from 'lodash';

export function Reducer(state = AppInitState, action): any {
	switch (action.type) {
		case TYPES.DATA_LOADED:
			state.data = action.data.data;
			return { ...state };
		case TYPES.SET_DECK_TYPE:
			state.deckChosen = action.data;
			return merge({}, state);
		case TYPES.ADD_RESULTS:
			state.results.push(action.data);
			return merge({}, state);
		case TYPES.ADD_SCORE:
			state.score = state.score + action.data;
			return merge({}, state);
		default:
			return state;
	}
}
