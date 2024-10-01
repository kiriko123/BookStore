import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store'
import './i18n.js'
import {PersistGate} from 'redux-persist/integration/react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

// Load Stripe using your publishable key
const stripePromise = loadStripe('pk_test_51Q4i0kCsOTWfrG9wCinAhRMgdsA9cJ9d7I4pvqrcZkrdYNMCubChGjIhdZafTNf8bIb2SPJpTkgZJPHxSJZYXqYO00MbNtjYFO');

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Elements stripe={stripePromise}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </Elements>
    // </StrictMode>,
)
