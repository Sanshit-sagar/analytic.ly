import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../layouts/AuthLayout";

const SignInPageMetadata = {
    title: 'Sign In Page',
    description: 'Sign Into Analytic.ly',
    clickImage: '',
};

const SignInPage = () => <SignIn signUpURL="/sign-up" />;

SignInPage.getLayout = function getLayout(page: any) {
    return (
        <AuthLayout pageMetadata={SignInPageMetadata}>
            {page} 
        </AuthLayout>
    )
}


export default SignInPage;