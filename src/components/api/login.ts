import axios from '../../../config/requestConfig'

namespace Login {

    export interface LoginReqForm {
        username: string;
        password: string;
    }

    export interface LoginResData {
        token: string
    }
}

export const login = (params: Login.LoginReqForm) => {
    return axios.post<Login.LoginResData>('/userDemo/login', params);
}