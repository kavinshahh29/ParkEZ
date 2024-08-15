
import { useLogin } from "../hooks/useLogin";

import { AuthTabs } from "../components/Auth/AuthTabs";


export default function Login() {
  const { googleLogin, } = useLogin();


//   const {user} = useSelector((state: any) => state.user);

  


  return (
    <div>
      {/* <h1>Hello how are you {user?.email} </h1> */}
      <AuthTabs googleLogin={googleLogin} />


    </div>
  );
}
