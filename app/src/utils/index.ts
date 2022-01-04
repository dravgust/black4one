export * from './toHttpPath'
export * from './ipfs'
export * from './validation'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const compose = (...fns: any) => (arg: any) => fns.reduce((composed: any, f: any) => f(composed), arg);
export const range = (size:number, startAt:number = 0):ReadonlyArray<number> => [...Array(size).keys()].map(i => i + startAt)