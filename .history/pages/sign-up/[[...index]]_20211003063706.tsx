import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from '../../layouts/AuthLayout'

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp signInUrl="/sign-in" />
    </AuthLayout>
  );
};


Dashboard.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout pageMetadata={timeseriesMetadata}>
            {page} 
        </DashboardLayout>
    )
}


export default SignUpPage;