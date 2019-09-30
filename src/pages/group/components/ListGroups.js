import React, { useEffect, useRef, useState } from 'react'

import Colors from '../../../assets/styles/Colors'
import CreateGroupModal from './CreateGroupModal'
import EditGroupModal from './EditGroupModal'
import GroupMenu from './GroupMenu'
import { Icon } from 'antd'
import Slider from 'react-slick'
import { isEmpty } from 'lodash'
import styled from 'styled-components'
import { useGroupsSelector } from '../../../store/ducks/groups'
import { useSelectedGroupSelector } from '../../../store/ducks/selectedGroup'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.darkPurple};
`

const GroupsContainer = styled.div`
  margin: 10px 30px;
`

const Title = styled.div`
  margin-top: 8px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  position: relative;
`

const ListGroups = () => {
  const [showCreateModal, toggleCreateModal] = useState(false)
  const [selectedGroupEdit, editGroup] = useState({})

  const groups = useGroupsSelector()
  const selectedGroup = useSelectedGroupSelector()

  const selectGroupIndex = groups.findIndex(
    ({ _id }) => selectedGroup._id === _id
  )
  const slider = useRef(null)

  useEffect(() => {
    slider.current.slickGoTo(selectGroupIndex - 1)
  }, [selectGroupIndex])

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false
  }

  return (
    <Container>
      <Title>
        <span>Groups</span>
        <Icon
          style={{ position: 'absolute', right: '20px', top: '7px' }}
          type="plus"
          onClick={() => toggleCreateModal(true)}
        />
      </Title>
      <GroupsContainer>
        <Slider ref={slider} {...settings}>
          {groups.map((group, index) => (
            <GroupMenu
              active={index === selectGroupIndex}
              onEdit={editGroup}
              key={group._id}
              group={group}
            />
          ))}
        </Slider>
      </GroupsContainer>
      {
        showCreateModal && (
          <CreateGroupModal
            visible
            onClose={() => toggleCreateModal(false)}
          />
        )
      }
      {
        !isEmpty(selectedGroupEdit) && (
          <EditGroupModal
            group={selectedGroupEdit}
            visible
            onClose={() => editGroup({})}
          />
        )
      }
    </Container>
  )
}

export default ListGroups
