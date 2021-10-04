import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../layouts/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn signUpURL="/sign-up" />
    </AuthLayout>
  );
};


SignInPage.getLayout = function getLayout(page: any) {
    return (
        <AuthLayout pageMetadata={signUpPageMetadata}>
            {page} 
        </AuthLayout>
    )
}


export default SignInPage;