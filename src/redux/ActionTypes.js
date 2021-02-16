import { allEvents, allMember } from "./mockData";

export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';
export const ADD_EVENT = 'ADD_EVENT';
export const FETCH_MEMBERS = 'FETCH_MEMBERS';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const UPDATE_EVENT = "UPDATE_EVENT";


export const deleteMember = (payload) =>{
    return {
        type: REMOVE_MEMBER,
        payload: payload
    }
}

export const updateMember = (payload) =>{
    return {
        type: UPDATE_MEMBER,
        payload: payload
    }
}

export const fetchMembers = () =>{
    return {
        type: FETCH_MEMBERS,
        payload: allMember
    }
}

export const fetchEvents = () =>{
    return {
        type: FETCH_EVENTS,
        payload: allEvents
    }
}

export const updateEvent = (payload) =>{console.log(payload);
    return {
        type: UPDATE_EVENT,
        payload: payload
    }
}