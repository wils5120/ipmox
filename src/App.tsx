import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ButtonPay, Modal, Navbar } from './components'
import { Home } from './pages'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  const [viewDetailProduct, setViewDetailProduct] = useState<boolean>(true)

  const viewPayControll = (show:boolean) => {
    setViewDetailProduct(show)
  }

  return (
    <Provider store={store}>
      <Navbar controllView={viewPayControll} viewDetailProduct={viewDetailProduct} />
      <Home  viewDetailProduct={viewDetailProduct}/>
    </Provider>
  )
}

export default App
