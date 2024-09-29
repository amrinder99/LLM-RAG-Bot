import React from 'react'
import companyImageDigital from '../assets/images/companyImage.png';

export default function CompanyImage() {
  return (<div>
      <img src={companyImageDigital} alt="company_image" className="w-24" id='companyImage' />
  </div>
  )
}
