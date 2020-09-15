import {IDestroyable} from './core'
export interface EventHandler{
    (type:any, handler:any, ...args:any[]):void
}


export interface IObserver extends IDestroyable{
    addListener:EventHandler, 
    removeListener:EventHandler,
    dispatch:( type:string )=>void;
}

export type Observer = IObserver;