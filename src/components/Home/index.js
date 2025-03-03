import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const token = Cookies.get('jwt-token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="h-con">
      <Header />
      <div className="hm">
        <h1 className="heading"> Your flexbility our Excellent</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card"
        />
      </div>
    </div>
  )
}
export default Home
