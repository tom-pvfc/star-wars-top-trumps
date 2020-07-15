import { APP_START } from '../../constants';

export const TYPES = {
    DATA_LOADED: APP_START | 0x00001,
    SET_DECK_TYPE: "SET_DECK_TYPE",
    ADD_RESULTS: "ADD_RESULTS",
};

export const ACTIONS = {
    DATA_LOADED: (data: any) => ({
        data,
        type: TYPES.DATA_LOADED,
    }),
    SET_DECK_TYPE:(type: string) =>{
        return{
            type: TYPES.SET_DECK_TYPE, 
            data: type            
        }
    },
    ADD_RESULTS:(name: string) =>{
        return{
            type: TYPES.ADD_RESULTS, 
            data: name            
        }
    }
};
