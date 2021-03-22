import {WINDOW_RESIZED} from './actionTypes'
import {MOBILE_BREAKPOINT} from './breakpoints'
 
const initialState = {
    isMobile: window.innerWidth <= MOBILE_BREAKPOINT
}

const deviceReducer = (state=initialState, action) => {
    switch (action.type) {
        case WINDOW_RESIZED :
            return {...state,
                isMobile: action.payload <= MOBILE_BREAKPOINT
    }
    default:
        return state;
}
}

//action creator 

export const windowResized = (windowWidth) => {
    return {
        type: WINDOW_RESIZED,
        payload: windowWidth
    }
}

export default deviceReducer;