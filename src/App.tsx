import AppRouter from "@/routes/AppRoutes";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";

const App = () => {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <AppRouter />;
};

export default App;
