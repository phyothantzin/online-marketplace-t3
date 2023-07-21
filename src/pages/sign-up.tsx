import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="container mx-auto mt-32 flex items-center justify-center">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
