import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode will cause useEffect to fire twice in dev mode
  // but not prod
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App/>
)
