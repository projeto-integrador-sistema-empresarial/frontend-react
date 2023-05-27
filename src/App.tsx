import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { AppThemeProvider, DrawerProvider } from './contexts';

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}

export default App
