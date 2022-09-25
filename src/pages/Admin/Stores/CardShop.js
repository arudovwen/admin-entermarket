import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "reactstrap"
import axios from "axios"
import { currency } from "../../../helpers/currency"

const CardShop = props => {
  const { shop, getShops } = props
  const name = shop.name
  const nameIcon = name.charAt(0)
  const handleCheckBox = (id, value) => {
    const token = localStorage.getItem("admin-token")

    var data = { id, active: value }
    axios
      .put(`${process.env.REACT_APP_URL}/change/store-status/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          getShops()
        }
      })
  }
  const handleDelete = (id, value) => {
    const token = localStorage.getItem("admin-token")

    let conf = window.confirm("Are you sure? You cannot undo this action")
    if (conf) {
      axios
        .delete(`${process.env.REACT_APP_URL}/stores/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            getShops()
          }
        })
    }
  }

  return (
    <React.Fragment>
      <Card className="bg-white tw-relative mb-0">
        <div className="tw-grid tw-grid-cols-3 tw-gap-2">
          <div className="tw-relative tw-p-2 tw-bg-gray-200">
            <img
              className="tw-w-full tw-h-[160px] tw-object-cover"
              src={shop.image}
            />
          </div>

          <div className="tw-flex tw-col-span-2 tw-justify-between tw-flex-col text-left tw-h-full p-3 bg-white">
            <div>
              {" "}
              <h5 className="">{shop.name}</h5>
              <p className="mb-1">{shop.products} product(s)</p>
              <p className="mb-1">{shop.storeorders} order(s)</p>
              <p className="mb-3">{shop.location}</p>
            </div>
            <div className="tw-flex tw-justify-between tw-gap-x-4 tw-relative">
              <p className="mb-0">Total sales: {currency.format(shop.price)}</p>
              <div className="tw-flex tw-gap-x-4 tw-items-center">
                {" "}
                <div className="square-switch ml-auto">
                  <input
                    type="checkbox"
                    id={"square-switch" + shop.id}
                    switch="none"
                    checked={shop.status ? true : false}
                    onChange={e => {
                      handleCheckBox(shop.id, !shop.status)
                    }}
                  />
                  <label
                    className="mb-0"
                    htmlFor={"square-switch" + shop.id}
                    data-on-label="On"
                    data-off-label="Off"
                  />
                </div>
                <span onClick={() => handleDelete(shop.id)}>
                  {" "}
                  <i class="fas fa-trash-alt tw-text-red-500 tw-text-lg mb-1"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <span className="tw-absolute tw-top-3 tw-right-3">
          {" "}
          {shop.status ? (
            <span className="tw-text-green-500 tw-bg-green-100 tw-rounded-full tw-px-3 tw-py-1 tw-text-xs">
              Active
            </span>
          ) : (
            <span className="tw-text-red-500  tw-bg-red-100 tw-rounded-full tw-px-3 tw-py-1 tw-text-xs">
              Inactive
            </span>
          )}
        </span>
      </Card>
    </React.Fragment>
  )
}

CardShop.propTypes = {
  shop: PropTypes.object,
  getShops: PropTypes.func,
}

export default CardShop
