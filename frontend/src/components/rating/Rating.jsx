import {FaStar,FaStarHalfAlt,FaRegStar} from "react-icons/fa";

import React from 'react'

const Rating = ({value,text}) => {
  return (
    <div className="rating">
      <span>
      {
        value >= 1? <FaStar color="gold"/> : value <= 0.5? <FaStarHalfAlt color="gold"/> : <FaRegStar color="gold"/>
      }
      </span>

      <span>
      {
        value >= 2? <FaStar color="gold"/> : value <= 1.5? <FaStarHalfAlt color="gold"/> : <FaRegStar color="gold"/>
      }
      </span>

      <span>
      {
        value >= 3? <FaStar color="gold"/> : value <= 2.5? <FaStarHalfAlt color="gold"/> : <FaRegStar color="gold"/>
      }
      </span>

      <span>
      {
        value >= 4? <FaStar  color="gold"/> : value <= 3.5? <FaStarHalfAlt color="gold"/> : <FaRegStar color="gold"/>
      }
      </span>

      <span>
      {
        value >= 5? <FaStar  color="gold"/> : value <= 4.5? <FaStarHalfAlt color="gold"/> : <FaRegStar color="gold"/>
      }
      </span>

      <span className="rating-text">
      {text && text}
      </span>
    </div>
  )
}

export default Rating
