import { useClerk } from '@clerk/nextjs'
import { useUser } from '@clerk/clerk-react'

type UserType = { name: string;  email: string };

export interface IUserAuth  {
    user: UserType | undefined;
    loading: boolean;
    error: boolean; 
};


function UserAuthFactory(user: any) {
    let userAuth: UserType = { 
        name: `${user?.firstName ?? ''}, ${user?.lastName ?? ''}`, 
        email: `${user?.primaryEmailAddress?.toString() ?? ''}` ?? '',
        phone: `${}`
    };
    return userAuth
}


export const useClerkSession = () => {
    const { primaryEmailAddress } = useClerk()
    return { primaryEmailAddress }
} 


export const useUserAuth = (): IUserAuth => {
    const { user, isSignedOut, isLoading } = useUser({ 
        withAssertions: true 
    });

    const isEmpty = (u: any) => !isSignedOut(u) && !isLoading(u) && !u

    return {
        user: !isSignedOut(user) && !isLoading(user) ? UserAuthFactory(user) : undefined,
        loading: isLoading(user),
        error: isSignedOut(user)  || isEmpty(user)
    };
}