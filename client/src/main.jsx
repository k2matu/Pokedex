import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
	<Router>
		<Provider store={store}>
			<StrictMode>
				<App />
			</StrictMode>
		</Provider>
	</Router>
)
