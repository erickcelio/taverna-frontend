import { FormattedMessage, injectIntl } from 'react-intl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const InputContainer = styled.div`
  margin-top: 16px;
  display: flex;
  position: relative;
  justify-content: center;
  align-content: center;
`

const SpanIcon = styled.span`
  padding: 8px;
  background: #fff;
  color: #333;
  border-radius: 5px 0 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid transparent;
  ${props =>
    props.invalid &&
    `
    border: 1.5px solid red;
  `};
  ${props =>
    props.valid &&
    `
    border: 2px solid green;
  `};
  border-right: none;
`

const Input = styled.input`
  width: 240px;
  font-size: 16px;
  color: #5e6472;
  outline: none;
  border-radius: 0 5px 5px 0;
  transition: 0.2s linear;
  border: 1.5px solid transparent;
  padding: 15px;
  ${props =>
    props.invalid &&
    `
    border: 1.5px solid red;
    padding: 20px 15px 10px;
  `};
  ${props =>
    props.valid &&
    `
    border: 1.5px solid green;
  `};
  border-left: none;
  &:focus {
    transform: translateX(-1.5px);
  }
`

const ErrorMessage = styled.span`
  font-size: 14px;
  position: absolute;
  color: red;
  top: 5px;
`

const intlPrefix = 'input.error'

const InputComponent = ({
  type,
  name,
  onChange,
  onBlur,
  value,
  valid,
  invalid,
  error,
  placeholder,
  icon,
  intl
}) => (
  <InputContainer>
    <SpanIcon invalid={invalid} valid={valid}>
      <FontAwesomeIcon icon={icon} />
    </SpanIcon>
    <Input
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      invalid={invalid}
      valid={valid}
      placeholder={intl.formatMessage({ id: placeholder })}
    />
    {invalid && (
      <ErrorMessage>
        <FormattedMessage id={`${intlPrefix}.${error}`} />
      </ErrorMessage>
    )}
  </InputContainer>
)

InputComponent.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  intl: PropTypes.object.isRequired,
  error: PropTypes.string,
  icon: PropTypes.any
}

InputComponent.defaultProps = {
  type: 'text',
  value: '',
  valid: false,
  invalid: false,
  placeholder: '',
  intl: {},
  error: '',
  icon: faUser
}

export default injectIntl(InputComponent)
