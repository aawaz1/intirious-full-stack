import { PRODUCTS_URL , UPLOAD_URL, USERS_URL} from "../constants";
import { apiSlice } from "./apiSlices";


 export const productApiSLlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query : () => ({
                url : PRODUCTS_URL
            }),
            providesTags :['Product'],
            keepUnusedDataFor : 5,

        }),
        getProductDetails :  builder.query({
            query : (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor : 5,

        }),
        createProduct : builder.mutation({
            query : () => ({
                url : PRODUCTS_URL,
                method : 'POST',


            }),
            invalidatesTags : ['Product']
        }),
        updateProduct : builder.mutation({
            query : (data) => ({
                url : `${PRODUCTS_URL}/${data.productId}`,
                method : 'PUT',
                body : data,


            }),
            invalidatesTags : ['Product']
        }),
        uploadProductImage : builder.mutation({
            query : (data) => ({
                url : `${UPLOAD_URL}`,
                method : 'POST',
                body : data,

            })
        }),
        deleteProduct : builder.mutation({
            query : (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`,
                method : 'DELETE',

            })

        }),
        getUsersDetails : builder.query({
            query : (userId) => ({
                url : `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor : 5,
        }),

        updateUser : builder.mutation({
            query : ({
                userId , data  }) => ({
                    url : `${USERS_URL}/${data._id}`,
                    method : 'PUT',
                    body : data,
                }),
                invalidatesTags : ['users'],
        })

    })

        
 })

 export const {useGetProductsQuery,useDeleteProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation ,useCreateProductMutation,useUpdateProductMutation} = productApiSLlice;