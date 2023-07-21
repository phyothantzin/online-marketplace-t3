import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="container mx-auto mt-32 flex items-center justify-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;
