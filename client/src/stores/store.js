import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import eventSlice from './student/event-slice';
import teamSlice from './student/team-slice';
import merchSlice from './student/merch-slice';
import adminEventSlice from './admin/admin-event-slice'
import adminMerchSlice from '../stores/admin/admin-merch-slice'
import adminuserdetailsSlice from '../stores/admin/user-details-slice';
import adminRegisterSlice from '../stores/admin/register-event-slice'
import registerEventSlice from '../stores/student/register-slice'
import paymentSlice from '../stores/student/payment-slice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        events: eventSlice, 
        team: teamSlice,
        merch: merchSlice,
        adminEvent: adminEventSlice,
        adminMerch: adminMerchSlice,
        adminUser:adminuserdetailsSlice,
        adminRegister:adminRegisterSlice,
        studentRegister:registerEventSlice,
        paymentSlice:paymentSlice

        
        
    },
})

export default store;
