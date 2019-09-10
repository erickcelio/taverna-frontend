import Colors from '../../../assets/styles/Colors'
import CreateGroupModal from './CreateGroupModal'
import GroupMenu from './GroupMenu'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useGroupsSelector } from '../../../store/ducks/groups'
import { Avatar, Dropdown, Icon, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  selectGroup,
  useSelectedGroupSelector
} from '../../../store/ducks/selectedGroup'

const Container = styled.div`
  display: flex;
  min-height: 160px;
  flex-direction: column;
  background-color: ${Colors.darkPurple};
`

const GroupsAndIconsContainer = styled.div`
  margin: 20px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupsContainer = styled.div`
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const Title = styled.div`
  margin-top: 8px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  position: relative;
`

const AvatarStyle = {
  minWidth: 64,
  margin: '0 8px',
  cursor: 'pointer'
}

const ListGroups = () => {
  const [groups, setGroups] = useState([])
  const [groupsIndex, changeGroupsIndex] = useState(0)
  const [rightArrowEnabled, toggleRightArrow] = useState(false)
  const [leftArrowEnabled, toggleLeftArrow] = useState(false)
  const [showModal, toggleModal] = useState(false)

  const allGroups = useGroupsSelector()
  const selectedGroup = useSelectedGroupSelector()

  const dispatch = useDispatch()

  const handleArrowClick = type => {
    let groupsIndexValue = groupsIndex
    if (type === 'increment' && rightArrowEnabled) {
      groupsIndexValue++
    } else if (type === 'decrement' && leftArrowEnabled) {
      groupsIndexValue--
    }
    changeGroupsIndex(groupsIndexValue)
  }

  useEffect(() => {
    const groupsNumber = allGroups.length / 3

    if (groupsNumber > 1) {
      const selectedGroups = []
      selectedGroups.push(allGroups[groupsIndex])
      selectedGroups.push(allGroups[groupsIndex + 1])
      selectedGroups.push(allGroups[groupsIndex + 2])
      setGroups(selectedGroups)
      toggleLeftArrow(groupsIndex > 0)
      toggleRightArrow(groupsIndex + 3 < allGroups.length)
    } else {
      setGroups(allGroups)
    }
  }, [groupsIndex, allGroups, selectedGroup])

  return (
    <Container>
      <Title>
        <span>Groups</span>
        <Icon
          style={{ position: 'absolute', right: '20px', top: '7px' }}
          type="plus"
          onClick={() => toggleModal(true)}
        />
      </Title>
      <GroupsAndIconsContainer>
        <Icon
          onClick={() => handleArrowClick('decrement')}
          type="left"
          style={{ fontSize: 24, color: leftArrowEnabled ? 'white' : 'gray' }}
        />
        <GroupsContainer>
          {groups.map(group => {
            const { name, image, _id } = group
            return (
              <Dropdown
                overlay={<GroupMenu group={group} />}
                key={_id}
                trigger={['contextMenu']}
              >
                <Tooltip title={name} placement="bottom">
                  <Avatar
                    style={AvatarStyle}
                    onClick={() => dispatch(selectGroup({ group }))}
                    shape="square"
                    size={64}
                    src={image}
                  />
                </Tooltip>
              </Dropdown>
            )
          })}
        </GroupsContainer>
        <Icon
          onClick={() => handleArrowClick('increment')}
          type="right"
          style={{ fontSize: 24, color: rightArrowEnabled ? 'white' : 'gray' }}
        />
      </GroupsAndIconsContainer>
      <CreateGroupModal
        visible={showModal}
        onClose={() => toggleModal(false)}
      />
    </Container>
  )
}

export default ListGroups
