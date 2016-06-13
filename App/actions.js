

export function stop() {
	return (dispatch, getState) => {
		dispatch({ type: 'STOP_ROUTE' });
	}
}

export function start() {
	return (dispatch, getState) => {
		dispatch({ type: 'START_ROUTE' });
	}
}

export function onMapPress(coordinate) {
	return (dispatch, getState) => {
		var { editing } = getState().app;
		if (!editing) {
			dispatch({ type: 'START_ROUTE', payload: coordinate });
		} else {
			dispatch({ type: 'SET_COORDINATE', payload: coordinate });
		}
	};
}