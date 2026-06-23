import { useState,useEffect } from 'react'
import axios from 'axios'

function App() {
const [employeeData, setEmployeeData] = useState([])
  useEffect(() => {
    axios.get('/api/test')
      .then(response => {
        setEmployeeData(response.data)
      })
      .catch(error => {
        console.error('Error fetching employee data:', error)
      })
  }, [])

  return (
   <>
    <h1>Employee Data</h1>
    <ul>
      {employeeData.map(employee => (
        <li key={employee.id}>
          <strong>Name:</strong> {employee.name}<br />
          <strong>Position:</strong> {employee.position}<br />
          <strong>Department:</strong> {employee.department}
        </li>
      ))}
    </ul>
    <h3>Docker File Working</h3>
   </>
  )
}

export default App
