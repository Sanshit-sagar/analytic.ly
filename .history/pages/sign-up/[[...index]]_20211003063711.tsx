import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from '../../layouts/AuthLayout'

const SignUpPage = () => {
  return (
    
      <SignUp signInUrl="/sign-in" />
    </AuthLayout>
  );
};


SignUpPage.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout pageMetadata={timeseriesMetadata}>
            {page} 
        </DashboardLayout>
    )
}


export default SignUpPage;