import {PAGE_NUMBER} from './types';

export const currentPageNumber = (page_number) => {
    return{
        type: PAGE_NUMBER,
        page_number
    }
}