import { combineReducers, createStore } from 'redux';
import * as ActionTypes from './ActionTypes';

const membersReducer = (state= {
    members:[]
} 
    ,action)=>
{
switch(action.type)
{

    case ActionTypes.FETCH_MEMBERS:
    case ActionTypes.REMOVE_MEMBER:
        return{...state,members:action.payload}

    default:
        return state;
    }
}

const eventReducer = (state= {
    events:[]
} 
    ,action)=>
{
switch(action.type)
{
    case ActionTypes.FETCH_EVENTS:
    case ActionTypes.UPDATE_EVENT:
        return {...state,events:action.payload}

    default:
        return state;
    }
}

const store = createStore(combineReducers({ membersReducer,  eventReducer}))
export default store