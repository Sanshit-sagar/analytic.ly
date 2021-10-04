import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../layouts/AuthLayout";

const SignInPage = () => {
  return (
    
      

  );
};


SignInPage.getLayout = function getLayout(page: any) {
    return (
        <AuthLayout pageMetadata={SignInPageMetadata}>
            {page} 
        </AuthLayout>
    )
}


export default SignInPage;