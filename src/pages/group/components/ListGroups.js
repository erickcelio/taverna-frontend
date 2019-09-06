import BaseUrl from '../../../constraints/BaseUrl'
import Colors from '../../../assets/styles/Colors'
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Avatar, Icon } from 'antd'

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
      {groups.map(({ image }) => (
        <Avatar shape="square" size={64} src={BaseUrl.imageBaseUrl + image} />
      ))}
    </GroupsContainer>
  )
}

const ListGroups = () => {
  return (
    <Container>
      <Title>
        <span>Groups</span>
        <Icon
          style={{ position: 'absolute', right: '20px', top: '7px' }}
          type="plus"
        />
      </Title>
      <div>
        <Groups />
      </div>
    </Container>
  )
}

export default ListGroups
