import {IUser} from "../../../models/IUser";
import {SetUserAction, AuthActionEnum, SetAuthAction, SetLoadingAction, SetErrorAction} from './types'
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
       try {
           setTimeout(async () => {
               dispatch(AuthActionCreators.setIsLoading(true));
               const response = await axios.get<IUser[]>('./users.json')
               const mockUser = response.data.find(user => user.username === username &&
                   user.password === password)
               if (mockUser) {
                   localStorage.setItem('auth', 'true');
                   localStorage.setItem('username', mockUser.username);
                   dispatch(AuthActionCreators.setIsAuth(true));
                   dispatch(AuthActionCreators.setUser(mockUser))
               } else {
                   dispatch(AuthActionCreators.setError('Uncorrected login and password'))
               }
               dispatch(AuthActionCreators.setIsLoading(false));
           }, 1000)
       } catch (e) {
            dispatch(AuthActionCreators.setError('Mistake is happened'))
       }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    },
}