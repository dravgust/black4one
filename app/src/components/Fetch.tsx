import React from 'react';
import { useFetch } from '../hooks/useFetch';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Fetch({
    uri,
    renderSuccess,
    loadingFallback = (<p>loading...</p>),
    renderError = (error: any) => (
        <pre>{JSON.stringify(error, null, 2)}</pre>) }: any
) {
    const { loading, data, error } = useFetch(uri);
    if (loading) return loadingFallback;
    if (error) return renderError(error);
    if (data) return renderSuccess({ data })
}