import React from 'react'
import { selectedGroupSelector } from '../../../store/selected-group/selectors'
import { useSelector } from 'react-redux'

const GroupInfo = () => {
  const group = useSelector(selectedGroupSelector)
  return <div style={{ flex: 1 }}>{group.name}</div>
}

export default GroupInfo
