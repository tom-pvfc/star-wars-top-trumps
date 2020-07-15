
import * as ReactRedux from 'react-redux';

import { iActionType, Dictionary } from '../../models/models';
export const STATE_KEY = 'app';

export interface AppProps extends ReactRedux.DispatchProp<any> {
	appState: AppState;
	loadData: (e) => iActionType;
	getDeeplinkEl: (e) => iActionType;
}

export interface AppState {
	data: Dictionary<any>;
	deckChosen: string;
	results: string[];
}
export const AppInitState: AppState = {
	data: null,
	deckChosen: "",
	results: []
}

export interface inAppState {
}

export const inAppInitialState: inAppState = {
}
