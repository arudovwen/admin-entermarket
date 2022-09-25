import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"
import axios from "axios"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card
import CardShop from "./CardShop"

//redux
import { useSelector, useDispatch } from "react-redux"

const EcommerceShops = props => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(1)
  const [shops, setShops] = React.useState()
  const [meta, setMeta] = React.useState({})
  useEffect(() => {
    getShops()
  }, [page])

  function getShops() {
    axios
      .get(`${process.env.REACT_APP_URL}/get-stores?page=${page}`)
      .then(res => {
        if (res.status === 200) {
          setShops(res.data.data)
          setMeta(res.data.meta)
        }
      })
  }
  function next() {
    let val = page + 1
    
    setPage(page + 1)
  }

  function prev() {
    setPage(page - 1)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Stores | EnterMarket -</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Stores" />
          <div className="tw-grid tw-grid-cols-2 tw-gap-6 py-5 tw-overflow-y-auto">
            {map(shops, (shop, key) => (
              <CardShop shop={shop} getShops={getShops} key={"_shop_" + key} />
            ))}
          </div>
          <div className="tw-mt-12 mb-4">
            {" "}
            <div className="tw-flex tw-justify-center tw-gap-x-4">
              <button
                onClick={() => prev()}
                disabled={page === 1}
                className="tw-px-6 tw-py-1 tw-bg-gray-200 tw-border tw-border-gray-200 tw-rounded"
              >
                Prev
              </button>

              <button
                onClick={() => next()}
                disabled={page === meta.last_page}
                className="tw-px-6 tw-py-1 tw-bg-gray-200 tw-border tw-border-gray-200 tw-rounded"
              >
                Next
              </button>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceShops.propTypes = {
  shops: PropTypes.array,
  onGetShops: PropTypes.func,
}

export default EcommerceShops
