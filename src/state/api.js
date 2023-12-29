import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: 'adminApi',
    tagTypes: [
        "Users",
        "Products",
        "Orders",
    ],
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `api/users`,
            providesTags: ['Users'],
        }),
        getUserById: build.query({
            query: (id) => `api/users/${id}`,
            providesTags: ['Users'],
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
} = api;