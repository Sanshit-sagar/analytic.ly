
export interface IUtmParameters {
    medium: string;
    term: string;
    source: string; 
    campaign: string; 
    content: string; 
}

export interface IParameters {
    params: string[];
    name: string; 
    index: number;
}

export interface INumberFieldProps {
    label: string | string[] | undefined | null;
    value: number | string;
    handleUpdate: (value: number) => void;  
}