import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import logoImg from '../assets/img/logo.png'
import pages from '../routes/AppPages'
import styled from 'styled-components'

const Container = styled.div`
  left: 0;
  flex: 1;
  height: 100%;
  display: flex;
  min-width: 65px;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #5640a2;
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
    width: 100%;
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

const SideBar = ({ logout, history }) => {
  const { pathname: path } = history.location
  const renderMenuIcons = items => {
    return items.map(item => (
      <IconContainer
        key={item.name}
        onClick={() => history.push(item.path)}
        active={item.path === path}
      >
        <FontAwesomeIcon color="white" size="2x" icon={item.icon} />
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
        <IconContainer onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} color="white" size="2x" />
        </IconContainer>
      </LogOutContainer>
    </Container>
  )
}

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: actions.logout
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(SideBar)
