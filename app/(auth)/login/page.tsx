"use client";

import Layout_1 from "@/app/components/common/layout_1";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <Layout_1>
      <button
        onClick={async () =>
          await signIn("google", {
            callbackUrl: "/app/app/protected",
          })
        }
      >
        Login with google
      </button>
      <button
        onClick={async () =>
          await signIn("facebook", {
            callbackUrl: "/app/app/protected",
          })
        }
      >
        Login with facebook
      </button>
      <button
        onClick={async () =>
          await signIn("credentials", {
            callbackUrl: "/app/app/protected",
          })
        }
      >
        Login with email
      </button>
    </Layout_1>
  );
};

export default LoginPage;
