import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import eventSlice from './student/event-slice';
import teamSlice from './student/team-slice';
import merchSlice from './student/merch-slice';
import adminEventSlice from './admin/admin-event-slice'
import adminMerchSlice from '../stores/admin/admin-merch-slice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        events: eventSlice, 
        team: teamSlice,
        merch: merchSlice,
        adminEvent: adminEventSlice,
        adminMerch: adminMerchSlice,
       
        
    },
})

export default store;