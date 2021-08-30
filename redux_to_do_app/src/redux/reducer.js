import { useEffect, useState } from 'react';
import axios from 'axios';

import {v4 as uuidv4} from 'uuid';

const initialState = { list:[] };


const reducer = (state = initialState, action) => {




    switch(action.type){
        case 'GET_TASKS':
            return {list: action.payload}
        case 'ADD_TO_LIST':
            let newItem = {id: uuidv4(), name: action.payload, status: "Pending"}
            return {list: [...state.list, newItem]};
        case 'REMOVE_FROM_LIST':
            let updatedList = state.list.filter(item =>item.id !== action.payload)
            return {list: updatedList};
        case 'CHANGE_PENDING_TO_DONE':
            let currentTaskList = state.list.slice(0);
            let updatedTaskList = currentTaskList.map (task => {
                if (task.id === action.payload){task.status = "Done"} return task; });
            return {list: updatedTaskList}
        default:
            return state;
    }
}

export default reducer;