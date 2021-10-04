import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from '../../layouts/AuthLayout'

const signUpPageMetadata = {
    title: 'Sign Up Form',
    description: 'Sign Up for analytic.ly'
};

const SignUpPage = () => {
  return <SignUp signInUrl="/sign-in" />

};


SignUpPage.getLayout = function getLayout(page: any) {
    return (
        <AuthLayout pageMetadata={signUpPageMetadata}>
            {page} 
        </AuthLayout>
    )
}


export default SignUpPage;