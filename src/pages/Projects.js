import React, { useEffect, useState } from 'react'
import {CCard} from '@coreui/react'
import {apiInstance} from '../services/commonService'
import axios from 'axios'

let initalStyle = {
  // padding: "10px",
  // minHeight: "400px",
  // alignItems: "center",
  // justifyContent: "center",
  // fontSize: "xxx-large",
  // fontWeight: "bold",
}

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    apiInstance.get('http://localhost:4000/projects').then(res=> {
      setProjects(res.data)
    }).catch(err => console.log(err))
  }, [])
  
  return (
    <div>
      <CCard style={initalStyle}>
      {
        projects.map((project, index) => {
          return (
            <div key={index}>
              {project.projectId}
              {project.projectName}
              {project.projectDescription}
            </div>
          )
        })
      }
    </CCard>
    </div>
  )
}