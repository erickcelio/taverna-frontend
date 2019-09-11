import PropTypes from 'prop-types'
import React from 'react'
import { deleteGroupService } from '../../../services/group'
import { removeGroupAction } from '../../../store/ducks/groups'
import { selectGroup } from '../../../store/ducks/selectedGroup'
import { useDispatch } from 'react-redux'
import { Avatar, Dropdown, Menu, Modal, Tooltip, message } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'

const AvatarStyle = {
  minWidth: 64,
  margin: '0 8px',
  cursor: 'pointer',
  userSelect: 'none'
}

const GroupMenu = ({ group, intl: { formatMessage } }) => {
  const dispatch = useDispatch()

  const showConfirmDeleteGroup = () => {
    const intlPrefix = 'groups.delete-group-modal'
    const { name, _id } = group
    Modal.confirm({
      title: formatMessage({ id: `${intlPrefix}.title` }, { name }),
      content: formatMessage({ id: `${intlPrefix}.content` }),
      okText: formatMessage({ id: `${intlPrefix}.ok-button` }),
      okType: 'danger',
      cancelText: formatMessage({ id: `${intlPrefix}.cancel-button` }),
      async onOk () {
        const data = await deleteGroupService({ _id })
        if (data.message === 'group_deleted_with_success') {
          dispatch(removeGroupAction({ group }))
          message.success('Group deleted with success!')
        }
      }
    })
  }

  const renderMenuOptions = group => {
    const intlPrefix = 'groups.group-menu'
    return (
      <Menu>
        <Menu.Item key="1">
          <FormattedMessage id={`${intlPrefix}.group-settings`} />
        </Menu.Item>
        <Menu.Item onClick={() => showConfirmDeleteGroup(group)} key="2">
          <FormattedMessage id={`${intlPrefix}.delete-group`} />
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <Dropdown
      overlay={() => renderMenuOptions(group)}
      trigger={['contextMenu']}
    >
      <Tooltip title={group.name} placement="bottom">
        <Avatar
          style={AvatarStyle}
          onClick={() => dispatch(selectGroup({ group }))}
          shape="square"
          size={64}
          src={group.image}
        />
      </Tooltip>
    </Dropdown>
  )
}

GroupMenu.propTypes = {
  group: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
}

export default injectIntl(GroupMenu)
