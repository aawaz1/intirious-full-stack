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
        register : builder.mutation({
            query : (data) => ({
                url : `${USERS_URL}`,
                method : 'POST',
                body : data,
         
            }),
        }),
        logout : builder.mutation({
            query : (data) => ({
                url : `${USERS_URL}/logout`,
                method : 'POST',
         
            }),
            

        }),
        // getUsers : builder.query({
        //     query : () => ({
        //         url : USERS_URL,

        //     }),
        //     providesTags : ['Users'],
        //     keepUnusedDataFor : 5
        // }),
        getUsers: builder.query({
            query: () => ({
              url: USERS_URL,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
          }),

          deleteUsers: builder.mutation({
            query: (userId) => ({
              url: `${USERS_URL}/${userId}`,
              method : "DELETE",

            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
          }),
          profile : builder.mutation({
            query : (data) => ({
              url :  `${USERS_URL}/profile`,
              method : 'PUT',
              body : data,

            })

          }),
          getUsersDetails : builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                
  
              }),
        
              keepUnusedDataFor: 5,

          }),

          updateUser : builder.mutation({
            query : (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method : "PUT",
                body : data,

            }),
            invalidatesTags : ['Users']
            
            
          }),
          createUser : builder.mutation({
            query : () => ({
             url : `${USERS_URL}/createuser`,
            method : 'POST',
            }),
          })
        
 })
})

 export const { useCreateUserMutation,useProfileMutation,useGetUsersQuery,useGetUsersDetailsQuery, useUpdateUserMutation,useDeleteUsersMutation,useRegisterMutation,useLoginMutation,useLogoutMutation} = usersApiSLlice;