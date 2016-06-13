var id = 0;
var initState = {
	status: 'start',
	polygons: [],
	editing: null,
};

export function reducer(state = initState, action) {
	switch (action.type) {
		case 'START_ROUTE': {
			var coordinate = action.payload;
			var { editing } = state;
	    	return {
	    		...state,
	    		editing: {
	    			id: id++,
	    			coordinates: [coordinate]
	    		}, 
	    		status: 'start' 
	    	};
    	}

		case 'SET_COORDINATE': {
			var coordinate = action.payload;
			var { editing } = state;
			return { 
				...state,
				editing: {
					...editing,
					coordinates: [
						...editing.coordinates, coordinate
					],
				},
			};
		}

		case 'STOP_ROUTE': {
		    var { polygons, editing } = state;
			return {
				...state,
				polygons: [...polygons, editing],
				editing: null,
				status: 'stop'
			};
		}

		default:
			return state;
	}
}