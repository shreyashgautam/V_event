import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import eventSlice from './student/event-slice';
import teamSlice from './student/team-slice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        events: eventSlice, 
        team: teamSlice,
       
        
    },
})

export default store;