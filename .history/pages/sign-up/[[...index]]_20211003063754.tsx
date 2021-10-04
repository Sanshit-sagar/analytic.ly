import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from '../../layouts/AuthLayout'

const signUpPageMetadata = {
    title: 'Sign Up Form',
    description: ''
}
const SignUpPage = () => {
  return (
    
      <SignUp signInUrl="/sign-in" />
    </AuthLayout>
  );
};


SignUpPage.getLayout = function getLayout(page: any) {
    return (
        <AuthLayout pageMetadata={signUpPageMetadata}>
            {page} 
        </AuthLayout>
    )
}


export default SignUpPage;