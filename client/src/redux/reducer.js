import { ADD_DOGS, REMOVE_DOGS} from "./actionTypes"

const initialState = {
    dogs: [],
    activeTemperaments:false
}
export const reducer = (state = initialState,{type,payload})=>{
    switch (type) {
        case ADD_DOGS:
            return{
                ...state,
                dogs: payload
            }
            
        case REMOVE_DOGS:
            return{
                ...state,
                dogs: []
            }


        default:
            return{
                ...state
            }
            
    }
}
