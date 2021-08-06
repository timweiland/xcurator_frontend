import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({ children }): JSX.Element => (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
)

export default Layout
