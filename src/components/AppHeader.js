import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSidebarBrand,
  CImage
} from '@coreui/react'

import avatar8 from '../assets/images/avatars/man.png'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import layoutData from '../assets/json/navigations.json'
import DefaultLayout from "./DefaultLayout.css"

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  let topNav = layoutData.topNav;
  let sideNav = layoutData.sideNav;

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
      { topNav ? (
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <CImage fluid src={layoutData.cmpyLogo} height={35} width={120}/>
      </CSidebarBrand>): (<CSidebarBrand></CSidebarBrand>)}
      { sideNav ? (
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
      </CHeaderToggler>): (<CHeaderToggler></CHeaderToggler>)}
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {topNav ? (
            <CNavItem theme={DefaultLayout}>
              {layoutData.navbarData.map((item, index) => {
                if ((item.items.length) === 0) {
                  return (
                    <CNavLink key={index} href={item.routePath}>{item.menuName}</CNavLink>)
                }
                else if ((item.items.length) !== 0) {
                  return (
                    <CDropdown variant="nav-item" key={index}>
                      <CDropdownToggle placement="bottom-end" caret={false}>
                        {item.menuName}
                      </CDropdownToggle>
                      <CDropdownMenu className="pt-0" placement="bottom-end">
                        {item.items.map((dropDown, index) => {
                          return (
                            <CDropdownItem key={index} href={dropDown.routePath}>
                              {dropDown.menuName}
                            </CDropdownItem>)
                        }
                        )}
                      </CDropdownMenu>
                    </CDropdown>
                  )
                }
              }
              )
              }
            </CNavItem>) : (<CNavItem></CNavItem>)}
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
