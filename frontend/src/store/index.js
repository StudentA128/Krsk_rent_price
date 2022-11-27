import {createStore, combineReducers} from "redux"
import { advertisementReducer } from "./advertisementsReducer"

const rootReducer = combineReducers({
    //advertisementReducer
})

export const store = createStore(rootReducer)