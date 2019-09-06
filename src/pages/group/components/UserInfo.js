import { Avatar } from 'antd'
import Colors from '../../../assets/styles/Colors'
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div`
  display: flex;
  min-height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.darkPurple};
`

const AvatarContainer = styled.div`
  margin: 0 20px;
`

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  
  span {
    font-weight: bold;
  }
`

const UserInfo = () => {
  const { name, avatar } = useSelector(state => state.auth.user)

  return (
    <Container>
      <AvatarContainer>
        <Avatar size={60} icon='user' src={avatar} />
      </AvatarContainer>
      <InfoContainer>
        <span> { name } </span>
      </InfoContainer>
    </Container>
  )
}

export default UserInfo
