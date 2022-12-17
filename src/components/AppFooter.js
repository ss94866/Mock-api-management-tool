import React from 'react'
import { CFooter } from '@coreui/react'
import navigation from '../assets/json/navigations.json'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href={navigation.cmpyWebLink} target="_blank" rel="noopener noreferrer">
        {navigation.cmpyName}
        </a>
        <span className="ms-1">&copy; 2022.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://hexaware.com/" target="_blank" rel="noopener noreferrer">
        Hexaware
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
