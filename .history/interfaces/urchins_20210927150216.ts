

export type IAuthMediumType = 'httpAuth' | 'sharedKey' | 'hmac' 

export interface EncodedBody {
    url: string; 
    email: string; 
    timestamp: number; 
};

export interface IPassword {
    secured: boolean; 
    password?: string;
    medium: IAuthMediumType; 
}

export interface IExpiry {
    immortal: boolean;
    start?: number;
    end?: number;  
}

export interface IUrchins {
    source:  string | undefined; 
    medium:  string | undefined; 
    term:  string | undefined; 
    content: string | undefined; 
    campaign: string | undefined,
    otherUrchins: string[] | undefined; 
}

export interface DecodedBody {
    url: string; 
    slug: string; 
    expiry: IExpiry; 
    urchins: IUrchins;
    password: IPassword; 
    encodedUrl: string; 
}; 