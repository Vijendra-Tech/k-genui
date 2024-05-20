import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Providers } from './components/providers.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </Providers>
)
