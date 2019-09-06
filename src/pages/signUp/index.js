import ButtonComponent from '../../components/ButtonComponent'
import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { registerService } from '../../services/auth'
import styled from 'styled-components'
import styles from '../../assets/styles/'
import { withFormik } from 'formik'
import { Button, FormBox, FormDiv, Header, HeaderH2 } from './../signIn/styles'
import { Form, Icon, Input } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'

const InputStyled = styled(Input)`
  width: 280px;
  height: 48px;
`

const SignUpForm = props => {
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    history,
    status,
    intl: { formatMessage },
    isSubmitting
  } = props

  const {
    email: emailError,
    name: nameError,
    username: usernameError,
    password: passwordError,
    repeatPassword: repeatPasswordError
  } = errors
  const {
    username: usernameStatus,
    password: passwordStatus,
    email: emailStatus
  } = status
  const hasUsernameError = usernameError || usernameStatus ? 'error' : ''
  const hasPasswordError = passwordError || passwordStatus ? 'error' : ''
  const hasEmailError = emailError || emailStatus ? 'error' : ''
  const hasNameError = nameError ? 'error' : ''
  const hasRepeatPasswordError = repeatPasswordError ? 'error' : ''
  const usernameErrorMessage =
    hasUsernameError &&
    formatMessage({ id: `input.error.${usernameStatus || usernameError}` })
  const passwordErrorMessage =
    hasPasswordError &&
    formatMessage({ id: `input.error.${passwordStatus || passwordError}` })
  const emailErrorMessage =
    hasEmailError &&
    formatMessage({ id: `input.error.${emailStatus || emailError}` })
  const nameErrorMessage =
    hasNameError && formatMessage({ id: `input.error.${nameError}` })
  const repeatPasswordErrorMessage =
    hasRepeatPasswordError &&
    formatMessage({ id: `input.error.${repeatPasswordError}` })

  return (
    <FormBox onSubmit={handleSubmit} noValidate>
      <FormDiv>
        <Header style={{ marginBottom: 0 }}>
          <HeaderH2>Taverna</HeaderH2>
        </Header>
        <div>
          <Form.Item validateStatus={hasNameError} help={nameErrorMessage}>
            <InputStyled
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              prefix={<Icon type="meh" />}
              placeholder={formatMessage({ id: 'register.input.name' })}
            />
          </Form.Item>
          <Form.Item
            validateStatus={hasUsernameError}
            help={usernameErrorMessage}
          >
            <InputStyled
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              prefix={<Icon type="user" />}
              placeholder={formatMessage({ id: 'register.input.username' })}
            />
          </Form.Item>
          <Form.Item validateStatus={hasEmailError} help={emailErrorMessage}>
            <InputStyled
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              prefix={<Icon type="mail" />}
              placeholder={formatMessage({ id: 'register.input.email' })}
            />
          </Form.Item>
          <Form.Item
            validateStatus={hasPasswordError}
            help={passwordErrorMessage}
          >
            <InputStyled
              placeholder={formatMessage({ id: 'register.input.password' })}
              type="password"
              name="password"
              onChange={handleChange}
              prefix={<Icon type="lock" />}
              value={values.password}
            />
          </Form.Item>
          <Form.Item
            validateStatus={hasRepeatPasswordError}
            help={repeatPasswordErrorMessage}
          >
            <InputStyled
              placeholder={formatMessage({
                id: 'register.input.repeat-password'
              })}
              type="password"
              name="repeatPassword"
              prefix={<Icon type="lock" />}
              onChange={handleChange}
              value={values.repeatPassword}
            />
          </Form.Item>
        </div>
        <ButtonComponent
          style={{ backgroundColor: styles.colors.purple }}
          onClick={handleSubmit}
          loading={isSubmitting}
          loadingColor={'white'}
          type="submit"
          message={'register.button.register'}
        />
        <Button style={{ margin: 0 }} onClick={() => history.push('/')} pass>
          <FormattedMessage id={'register.button.login'} />
        </Button>
      </FormDiv>
    </FormBox>
  )
}

SignUpForm.propTypes = {
  values: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  status: PropTypes.object
}

SignUpForm.defaultProps = {
  status: {}
}

const SignUpPageWithFormik = withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({
    email: '',
    password: '',
    name: '',
    username: '',
    repeatPassword: ''
  }),
  validate: values => {
    const errors = {}

    if (!values.password) {
      errors.password = 'required'
    }

    if (!values.password) {
      errors.repeatPassword = 'required'
    }

    if (values.password !== values.repeatPassword) {
      errors.password = 'invalid-password-confirmation'
      errors.repeatPassword = 'invalid-password-confirmation'
    }

    if (!values.name) {
      errors.name = 'required'
    }

    if (!values.username) {
      errors.username = 'required'
    }

    if (!values.email) {
      errors.email = 'required'
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'invalid-email-address'
    }

    return errors
  },

  handleSubmit: async (values, { props, setStatus, setSubmitting }) => {
    try {
      const response = await registerService(values)
      props.login(response)
      props.history.push('/home')
    } catch (e) {
      const error = e.response.data.error
      switch (error) {
        case 'email_already_exists':
          setStatus({ email: 'email-already-exists' })
          break
        case 'user_already_exists':
          setStatus({ username: 'username-already-exists' })
          break
        default:
          break
      }
      setSubmitting(false)
    }
  }
})(SignUpForm)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: actions.login
    },
    dispatch
  )

export default injectIntl(
  connect(
    null,
    mapDispatchToProps
  )(SignUpPageWithFormik)
)
