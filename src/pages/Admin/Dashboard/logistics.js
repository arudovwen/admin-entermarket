import React from "react"
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap"
import axios from "axios"

export default function logistics() {
  const [logistics, setLogistics] = React.useState([])

  React.useEffect(() => {
    getLogistics()
  }, [])
  function getLogistics() {
    axios.get(`${process.env.REACT_APP_URL}/logistics`).then(res => {
      if (res.status === 200) {
        setLogistics(res.data.data)
      }
    })
  }
  return (
    <Card className="card-box">
      <CardHeader>
        <CardTitle>Logistics</CardTitle>
      </CardHeader>
      <CardBody className="">
        <Table>
          <tbody>
            {logistics.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
