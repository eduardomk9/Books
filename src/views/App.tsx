// App.tsx
import React from "react";
import { ThemeProvider } from "@mui/material";
import { useTheme } from "../hooks/useTheme";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import { PageTitleProvider } from "../components/PageTitleProvider";
import AppRoutes from "../routes/AppRoutes"; // Importe o componente AppRoutes aqui

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <CssBaseline />
          <PageTitleProvider>
            <AppRoutes /> {/* Use o componente AppRoutes aqui */}
          </PageTitleProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
