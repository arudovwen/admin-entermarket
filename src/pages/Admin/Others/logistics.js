import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory from "react-bootstrap-table2-editor"
import Dropzone from "react-dropzone"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"
import axios from "axios"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { currency } from "../../../helpers/currency"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const EcommerceOthers = props => {
  const dispatch = useDispatch()

  const [logistics, setLogistics] = useState([])
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [location, setLocation] = useState(null)
  const { status } = useSelector(state => ({
    status: state.ecommerce.status,
  }))
  const apikey = process.env.REACT_APP_APIKEY
  const [isdisabled, setisdisabled] = useState(false)

  useEffect(() => {
    getLogistics()
  }, [])

  //pagination customization
  const pageOptions = {
    sizePerPage: 25,
    totalSize: logistics.length, // replace later with size(products),
    custom: true,
  }
  currency

  const { SearchBar } = Search
  function getLogistics() {
    axios.get(`${process.env.REACT_APP_URL}/logistics`).then(res => {
      if (res.status === 200) {
        setLogistics(res.data.data)
      }
    })
  }
  const EcommercelogisticsColumns = toggleModal => [
    {
      dataField: "id",
      text: " ID",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row, index) => (
        <Link to="#" className="text-body fw-bold">
          {index + 1}
        </Link>
      ),
    },
    {
      dataField: "name",
      text: "Logistics",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {row.name}
        </div>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {row.email || "-"}
        </div>
      ),
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {row.phone || "-"}
        </div>
      ),
    },
    {
      dataField: "website",
      text: "Website",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {row.website || "-"}
        </div>
      ),
    },
    {
      dataField: "location",
      text: "Location",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {row.location || "-"}
        </div>
      ),
    },

    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, logistics) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDelete(logistics)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
      editable: () => {
        return false
      },
    },
  ]

  const selectRow = {
    mode: "checkbox",
  }

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  const handleDelete = data => {
    let confirm = window.confirm("Are you sure?")
    if (confirm) {
      if (data.id !== undefined) {
        axios
          .delete(`${process.env.REACT_APP_URL}/logistics/${data.id}`)
          .then(res => {
            if (res.status === 200) {
              toastr.success("Updated")

              let filteredLogistics = [...logistics].filter(
                item => Number(item.id) !== Number(data.id)
              )

              setLogistics(filteredLogistics)
            }
          })
      }
    }
  }

  const handleTableNameUpdate = (id, value, column) => {
    var data = { id, name: value }

    axios
      .put(`${process.env.REACT_APP_URL}/logistics/${id}`, data)
      .then(res => {
        if (res.status === 200) {
          toastr.success("Updated")
          getLogistics()
        }
      })
  }

  function addLogistics(e, values) {
    setisdisabled(true)
    values.location = location.label

    axios
      .post(`${process.env.REACT_APP_URL}/logistics`, values)
      .then(res => {
        if (res.status === 201) {
          toastr.success("Added")
          setisdisabled(false)
          toggle()

          let filteredLogistics = [res.data, ...logistics]
          setLogistics(filteredLogistics)
        }
      })
      .catch(() => {
        setisdisabled(false)
        toastr.error("Server error")
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Logistics | EnterMarket</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Logistics" breadcrumbItem="Fees" />
          <Row className="justify-content-center">
            <Col xs="12" md="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommercelogisticsColumns(toggle)}
                    data={logistics}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={logistics}
                        columns={EcommercelogisticsColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2 align-items-center">
                              <Col sm="4">
                                <h4>Logistics</h4>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={toggle}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bproducted={false}
                                    striped={false}
                                    selectRow={selectRow}
                                    cellEdit={cellEditFactory({
                                      mode: "dbclick",
                                      blurToSave: true,
                                      beforeSaveCell(
                                        oldValue,
                                        newValue,
                                        row,
                                        column,
                                        done
                                      ) {
                                        handleTableNameUpdate(
                                          row.id,
                                          newValue,
                                          column.dataField
                                        )
                                        done()
                                        return { async: true }
                                      },
                                    })}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    Add logistics
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm onValidSubmit={addLogistics}>
                                      <Row>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="name"
                                              label="Logistics Name"
                                              type="text"
                                              errorMessage="Invalid  name"
                                              placeholder="Enter logistics name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="email"
                                              label="Email"
                                              type="email"
                                              placeholder="Enter logistics email"
                                              errorMessage="Invalid  email"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="phone"
                                              label="Phone number"
                                              placeholder="Enter logistics phone"
                                              errorMessage="Invalid "
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="website"
                                              label="Website"
                                              placeholder="Enter logistics website"
                                              errorMessage="Invalid "
                                              type="url"
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="mb-3">
                                            <label>Location </label>
                                            <GooglePlacesAutocomplete
                                              name="location"
                                              label="Location"
                                              selectProps={{
                                                location,
                                                onChange: setLocation,
                                              }}
                                              apiKey={apikey}
                                              placeholder="Enter location e.g 10, Admiralty way, lekki, Lagos, Nigeria"
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">
                                            <button
                                              type="submit"
                                              className="btn btn-success save-user"
                                              disabled={isdisabled}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </AvForm>
                                  </ModalBody>
                                </Modal>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceOthers.propTypes = {
  logistics: PropTypes.array,
}

export default withRouter(EcommerceOthers)
