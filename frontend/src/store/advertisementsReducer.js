
const defaultState = {
    advertisements: []
}

export const advertisementReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_ADVERTISEMENTS":
            return {...state, advertiisements: state.advertisements}
    }
}