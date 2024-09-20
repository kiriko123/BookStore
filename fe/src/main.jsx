import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './redux/store'
import './i18n.js'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  // </StrictMode>,
)
