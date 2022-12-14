import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  const vendorToken = localStorage.getItem('user-token')
  const adminToken = localStorage.getItem("admin-token")
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          {vendorToken ? (
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Menu")} </li>

              <li>
                <Link to="/dashboard">
                  <i className="bx bx-home-circle"></i>

                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/ecommerce-products">
                  <i className="bx bx-package"></i>

                  <span>{props.t("Products")}</span>
                </Link>
              </li>

              <li>
                <Link to="/ecommerce-orders">
                  <i className=" bx bx-task"></i>
                  <span>{props.t("Orders")}</span>
                </Link>
              </li>

              <li>
                <Link to="/ecommerce-others">
                  <i className="bx bx-store"></i>
                  <span>{props.t("Others")}</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Menu")} </li>

              <li>
                <Link to="/admin">
                  <i className="bx bx-home-circle"></i>

                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/orders">
                  <i className="bx bx-package"></i>

                  <span>{props.t("Orders")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/orders/pending">
                  <i className="bx bx-dice-1"></i>

                  <span>{props.t("Pending Orders")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/orders/assigned">
                  <i className="bx bx-list-check"></i>

                  <span>{props.t("Assigned Orders")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/orders/completed">
                  <i className="bx bx-check-square"></i>

                  <span>{props.t("Completed Orders")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/orders/failed">
                  <i className="bx bx-block"></i>

                  <span>{props.t("Failed Orders")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/lgas">
                  <i className="bx bx-book"></i>

                  <span>{props.t("Lgas")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/categories">
                  <i className="bx bx-archive-in"></i>

                  <span>{props.t("Categories & Brands")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/stores">
                  <i className="bx bx-home"></i>

                  <span>{props.t("Stores")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/logistics">
                  <i className="bx bx-run"></i>

                  <span>{props.t("Logisitics")}</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
