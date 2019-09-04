import { FormattedMessage } from 'react-intl'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  color: #fff;
  width: 280px;
  height: 50px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s linear;
  letter-spacing: 0.05em;
`

const ButtonComponent = ({
  onClick,
  message,
  style,
  loading,
  loadingType,
  loadingColor,
  loadingHeight,
  loadingWidth
}) => (
  <Button style={style} onClick={onClick}>
    {loading ? (
      <Loader
        type={loadingType || 'ThreeDots'}
        color={loadingColor || 'black'}
        height={loadingHeight || 50}
        width={loadingWidth || 50}
      />
    ) : (
      <FormattedMessage id={message} />
    )}
  </Button>
)

ButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  style: PropTypes.object,
  loading: PropTypes.bool,
  loadingType: PropTypes.string,
  loadingColor: PropTypes.string,
  loadingHeight: PropTypes.number,
  loadingWidth: PropTypes.number
}

ButtonComponent.defaultProps = {
  loading: false,
  loadingType: null,
  loadingColor: null,
  loadingHeight: null,
  loadingWidth: null
}

export default ButtonComponent
