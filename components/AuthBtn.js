import { ChevronDownIcon, RefreshIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const AuthBtn = () => {
  // object with session/login data
  const { data: session, status } = useSession();

  // loading animation
  if (status === "loading") {
    return (
      <div className="auth-btn">
        <div className="auth-info">
          <RefreshIcon className="icon animate-spin" />
        </div>
      </div>
    );
  }

  // not logged in
  if (status === "unauthenticated") {
    return (
      <div className="auth-btn">
        <button onClick={() => signIn()}>Login</button>
      </div>
    );
  }

  // logged in
  return (
    <div className="auth-btn">
      <div className="auth-info">
        <Image src={session.user.image} alt={session.user.name} width={30} height={30} className="rounded-full" />
        <p>{session.user.name}</p>
      </div>
      <div>
        <button onClick={() => signOut()} className="cta">
          Logout
        </button>
      </div>
    </div>
  );
};
export default AuthBtn;
