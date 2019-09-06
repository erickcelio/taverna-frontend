import Colors from '../../../assets/styles/Colors'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 280px;
  display: flex;
  background-color: ${Colors.mediumPurple};
  flex-direction: column;
`

const SideBarSecondary = ({ children }) => {
  return <Container>{children}</Container>
}

SideBarSecondary.propTypes = {
  children: PropTypes.any.isRequired
}

export default SideBarSecondary
