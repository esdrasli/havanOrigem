import {
  Footer,
  Navbar,
  PageBody,
  Profile,
  Sidebar,
  ThemeProvider,
} from "@havan/react-components";
import { BrowserRouter } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "./hooks/auth";
import Routes from "./routes";

function App() {
  const { signOut, user } = useAuth();

  if (!user) {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        <PageBody>
          <Navbar signOut={signOut}>
            <Profile user={user}>
              <button type="button" title="Sair do sistema" onClick={signOut}>
                <FaSignOutAlt /> Logout
              </button>
            </Profile>
          </Navbar>
          <Sidebar
            list={[
              { id: 1, label: "Dashboard", to: "/" },
              {
                id: 2,
                label: "Origem",
                items: [
                  {
                    id: 3,
                    label: "Origem",
                    to: "/Origem",
                  },
                ],
              },
            ]}
          />
          <Routes />
          <Footer />
        </PageBody>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
