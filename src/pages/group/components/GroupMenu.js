import { Avatar, Dropdown, Menu, Modal, Tooltip, message } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'

import PropTypes from 'prop-types'
import React from 'react'
import { deleteGroupService } from '../../../services/group'
import { removeGroupAction } from '../../../store/groups/actions'
import { selectGroupAction } from '../../../store/selected-group/actions'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

const AvatarStyled = styled(Avatar)`
  min-width: 64px;
  margin: 8px;
  cursor: pointer;
  user-select: none;
  ${props =>
    props.active &&
    `
    transform: scale(1.2)
  `}
`

const GroupMenu = ({ active, onEdit, group, intl: { formatMessage } }) => {
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
        const group = await deleteGroupService({ _id })
        dispatch(removeGroupAction({ group }))
        message.success('Group deleted with success!')
      }
    })
  }

  const renderMenuOptions = group => {
    const intlPrefix = 'groups.group-menu'
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => onEdit(group)}>
          <FormattedMessage id={`${intlPrefix}.edit-group`} />
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
        <AvatarStyled
          active={active ? 1 : 0}
          onClick={() => dispatch(selectGroupAction({ group }))}
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
  intl: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onEdit: PropTypes.func.isRequired
}

export default injectIntl(GroupMenu)
