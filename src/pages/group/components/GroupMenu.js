import { Menu } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const GroupMenu = ({ group }) => {
  console.log('group', group)
  return (
    <Menu>
      <Menu.Item key="1">Group Settings</Menu.Item>
      <Menu.Item key="2">Delete Group</Menu.Item>
    </Menu>
  )
}

GroupMenu.propTypes = {
  group: PropTypes.object.isRequired
}

export default GroupMenu
