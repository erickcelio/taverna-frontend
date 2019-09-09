import Colors from '../../../assets/styles/Colors'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Avatar, Icon, Modal } from 'antd'
import React, { useState } from 'react'
import CreateGroupModal from './CreateGroupModal'

const Container = styled.div`
  display: flex;
  min-height: 160px;
  flex-direction: column;
  background-color: ${Colors.darkPurple};
`

const GroupsContainer = styled.div`
  margin-top: 20px;
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

const Groups = () => {
  const groups = useSelector(state => state.groups)
  return (
    <GroupsContainer>
      {groups.map(({ image, name }) => (
        <Avatar key={name} shape="square" size={64} src={image} />
      ))}
    </GroupsContainer>
  )
}

const ListGroups = () => {
  const [showModal, toggleModal] = useState(true)
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
      <div>
        <Groups />
      </div>
      <CreateGroupModal visible={showModal} />
    </Container>
  )
}

export default ListGroups
