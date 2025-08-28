import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router";

type WrapperProps = {
  children: React.ReactNode;
};

function Wrapper({ children }: WrapperProps) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuth(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  } else if (auth) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Wrapper;
