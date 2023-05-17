import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex justify-center h-screen">
      {session ? (
        <div className="grid m-auto text-center">
          <div className="m-4 text-lg mb-6">Signed in as {session.user.name}</div>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-3
                    bg-[#0ea5e9] text-white
                      border border-[#0ea5e9] rounded-2xl
                    hover:bg-white hover:text-[#0ea5e9]`}
            onClick={() => router.push("/")}
          >
            View TodoList
          </button>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    text-[#0ea5e9]
                      border border-[#0ea5e9] rounded-2xl
                    hover:bg-white hover:text-[#0ea5e9]`}
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="grid m-auto text-center">
          <div className="text-lg m-4">Not signed in</div>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    bg-[#0ea5e9] text-white
                      border border-[#0ea5e9] rounded-2xl
                    hover:bg-white hover:text-[#0ea5e9]`}
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

