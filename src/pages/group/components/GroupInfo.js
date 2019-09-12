import React from 'react'
import { useSelectedGroupSelector } from '../../../store/ducks/selectedGroup'

const GroupInfo = () => {
  const group = useSelectedGroupSelector()
  return <div style={{ flex: 1 }}>{group.name}</div>
}

export default GroupInfo
