


type IAuthMediumType = 'httpAuth' | 'sharedKey' | 'hmac' 

interface EncodedBody {
    url: string; 
    email: string; 
    timestamp: number; 
};

interface IPassword {
    secured: boolean; 
    password?: string;
    medium: IAuthMediumType; 
}

interface IExpiry {
    immortal: boolean;
    start?: number;
    end?: number;  
}

interface IUrchins {
    source:  string | undefined; 
    medium:  string | undefined; 
    term:  string | undefined; 
    content: string | undefined; 
    campaign: string | undefined,
    otherUrchins: string[] | undefined; 
}

interface DecodedBody {
    url: string; 
    slug: string; 
    expiry: IExpiry; 
    urchins: IUrchins;
    password: IPassword; 
    encodedUrl: string; 
}; 