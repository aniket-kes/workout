import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
const {dispatch} = useAuthContext()
const {dispatch: workoutDispatch} = useWorkoutsContext()

    const logout = () => {
        //remove user from storege
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUT',payload:null})

    }
    return {logout}
}