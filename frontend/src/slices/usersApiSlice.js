import {USERS_URL} from '../constants'
import { apiSlice } from './apiSlices';

export const usersApiSLlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({
            query : (data) => ({
                url : `${USERS_URL}/auth`,
                method : 'POST',
                body : data
            }),
            

        }),
        
 })
});

 export const {useLoginMutation} = usersApiSLlice;