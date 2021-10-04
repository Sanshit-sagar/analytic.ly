import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../layouts/AuthLayout";

const SignInPageMetadata {
    
}


const SignInPage = () => <SignIn signUpURL="/sign-up" />;

SignInPage.getLayout = function getLayout(page: any) {
    return (
        <AuthLayout pageMetadata={SignInPageMetadata}>
            {page} 
        </AuthLayout>
    )
}


export default SignInPage;