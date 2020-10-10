import {PAGE_DATA} from './types';

export const currentPageNumber = (pageData) => {
    return{
        type: PAGE_DATA,
        pageData
    }
}