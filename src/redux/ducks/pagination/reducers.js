import {PAGE_DATA} from './types';

export default (state={pageData: []}, action) => {

   if(action.type === PAGE_DATA){
       state.pageData = action.pageData;
       return{...state};
   }

   return{...state};
}