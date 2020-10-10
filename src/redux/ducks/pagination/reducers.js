import {PAGE_NUMBER} from './types';

export default (state={page_number: []}, action) => {

   if(action.type === PAGE_NUMBER){

       state.page_number = action.page_number;
       return{...state};
   }

   return{...state};
}