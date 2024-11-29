import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-core7.p.rapidapi.com/',
        prepareHeaders: (headers) =>{
            headers.set('x-rapidapi-key', 'debb239ad8mshe1bcaa394881eb3p110f43jsnd38f59861ab1');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/charts/get-top-songs-in-world?limit=20'})
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;