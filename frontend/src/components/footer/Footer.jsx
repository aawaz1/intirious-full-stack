import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-1'>
        <h4>Customer Services</h4>
        <Link style={{textDecoration : 'none'}} to='/privacypolicy'><div>Privacy Policy</div></Link>
        <div> Policy</div>
      </div>
      <div className='footer-1'>
      <h4> Services</h4>
        Return Policy
      </div>
      {/* <div className='footer-1'>
        Return Policy
      </div>
     
      <div className='footer-1'>
        Return Policy
      </div> */}
    </div>
  )
}

export default Footer;