import {Oval} from 'react-loader-spinner'
import './Loader.css'

function Loader() {
  return (
    <div className='loader'>
    <h1>Loading...Please wait</h1>
    <Oval
    
    height={80}
    width={80}
    color="#4fa94d"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="#4fa94d"
    strokeWidth={2}
    strokeWidthSecondary={2}
  
  />
  </div>
  
  )
}

export default Loader
