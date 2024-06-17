import { AuthProvider } from "./context/AuthContext";
import AppNavigatior from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigatior />
    </AuthProvider>
  );
}
