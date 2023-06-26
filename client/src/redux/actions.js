import { ADD_DOGS, REMOVE_DOGS} from "./actionTypes";

export const addDogs = (dogs) => {

    return async(dispatch) => {
      try {
         return dispatch({
            type: ADD_DOGS,
            payload: dogs,
         })
      } catch (error) {
         console.log(error.message)
      }
    };
}

export const removeDogs = (dogs) => {
    return async (dispatch) => {
      try {
         return dispatch({
             type: REMOVE_DOGS,
             payload: dogs,
         });
      } catch (error) {
         console.log(error.message);
      }

    };
    
}

