
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
{component: CNavItem, name: 'Projects', to: 'Projects'},
{component: CNavItem, name: 'MockServer', to: 'MockServer'},
{component: CNavItem, name: 'ApiScore', to: 'ApiScore'},
]

export default _nav;