export interface iActionType {
    type: number,
    data: any | any[],
}

export interface Dictionary<T> {
    [idx: string]: T;
}

export interface iValue {
    key: string | number;
    value: React.ReactNode;
}

export interface iTopTrumpTypes {
    key: string;
    value: string;
}

export interface iCard extends iPeopleData ,iStarshipData { 
    key: string;
    // data: iPeopleData | iStarshipData;
}

export interface iPeopleData{
    key: string;
    name: string;
    gender: string;
    height: number;
    birth_year:number | string;
    mass: number;
}

export interface iStarshipData{
    key: string;
    name: string;
    passengers: number;
    hyperdrive_rating: number;
    manufacturer: string;
    model: string;
    starship_class:string;
}
