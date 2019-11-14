import { Icon } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { authLogoutAction } from '../store/auth/actions'
import logoImg from '../assets/img/logo.png'
import pages from '../routes/AppPages'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  left: 0;
  flex: 1;
  height: 100%;
  display: flex;
  position: fixed;
  min-width: 65px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(86, 64, 162, 0.8);
`

const LogoContainer = styled.div`
  margin-top: 16px;
  flex: 1;
`

const LogOutContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
`

const MenuContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  svg {
    width: 30px;
    margin: 5px 0;
    height: 25px;
  }
`

const Logo = styled.img`
  width: 50px;
  height: 50px;
`

const IconContainer = styled.div`
  ${props =>
    props.active &&
    `
    background-color: #473D78;
  `};
  align-items: center;
  cursor: pointer;
`

const SideBar = ({ history }) => {
  const { pathname: path } = history.location

  const dispatch = useDispatch()

  const renderMenuIcons = items => {
    return items.map(item => (
      <IconContainer
        key={item.name}
        onClick={() => history.push(item.path)}
        active={item.path === path}
      >
        <Icon style={{ color: 'white' }} type={item.icon}/>
      </IconContainer>
    ))
  }

  return (
    <Container>
      <LogoContainer>
        <Logo src={logoImg} alt="logo" />
      </LogoContainer>
      <MenuContainer>{renderMenuIcons(pages)}</MenuContainer>
      <LogOutContainer>
        <IconContainer onClick={() => dispatch(authLogoutAction())}>
          <Icon style={{ color: 'white', fontSize: '25px' }} type='logout' />
        </IconContainer>
      </LogOutContainer>
    </Container>
  )
}

SideBar.propTypes = {
  history: PropTypes.object.isRequired
}

export default SideBar
