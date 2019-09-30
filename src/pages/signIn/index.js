import { Button, FormBox, FormDiv, Header, HeaderH2, HeaderP } from './styles'
import { Form, Icon, Input } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import React, { useEffect } from 'react'
import { loginService, logoutService } from '../../services/auth'

import ButtonComponent from '../../components/ButtonComponent'
import PropTypes from 'prop-types'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../../assets/styles/'
import { withFormik } from 'formik'

const SignInForm = props => {
  const {
    values,
    handleChange,
    handleSubmit,
    history,
    isSubmitting,
    errors,
    status,
    intl: { formatMessage }
  } = props

  useEffect(() => {
    logoutService()
  }, [])

  const { username: usernameError, password: passwordError } = errors
  const { username: usernameStatus, password: passwordStatus } = status
  const hasUsernameError = usernameError || usernameStatus ? 'error' : ''
  const hasPasswordError = passwordError || passwordStatus ? 'error' : ''
  const usernameErrorMessage =
    hasUsernameError &&
    formatMessage({ id: `input.error.${usernameStatus || usernameError}` })
  const passwordErrorMessage =
    hasPasswordError &&
    formatMessage({ id: `input.error.${passwordStatus || passwordError}` })

  return (
    <FormBox onSubmit={handleSubmit}>
      <FormDiv>
        <Header>
          <HeaderH2>Taverna</HeaderH2>
          <HeaderP>
            <FormattedMessage id={'login.subtitle'} />
          </HeaderP>
        </Header>
        <div style={{ width: '280px' }}>
          <Form.Item
            validateStatus={hasUsernameError}
            help={hasUsernameError && usernameErrorMessage}
          >
            <Input
              style={{ height: '48px' }}
              prefix={<Icon type="user" />}
              placeholder={formatMessage({ id: 'login.input.username' })}
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
            />
          </Form.Item>
          <Form.Item
            validateStatus={hasPasswordError}
            help={hasPasswordError && passwordErrorMessage}
          >
            <Input
              style={{ height: '48px' }}
              prefix={<Icon type="lock" />}
              placeholder={formatMessage({ id: 'login.input.password' })}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
          </Form.Item>
        </div>
        <ButtonComponent
          style={{ backgroundColor: styles.colors.purple }}
          onClick={handleSubmit}
          loading={isSubmitting}
          loadingColor={'white'}
          type="submit"
          message={'login.button.login'}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={() => history.push('/recovery')} pass>
            <FormattedMessage id={'login.button.forgot-password'} />
          </Button>
          <ButtonComponent
            style={{ backgroundColor: 'white', color: 'black', maxWidth: 160 }}
            onClick={() => history.push('/register')}
            message="login.button.sign-up"
          />
        </div>
      </FormDiv>
    </FormBox>
  )
}

SignInForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  status: PropTypes.object
}

SignInForm.defaultProps = {
  status: {}
}

const SignInPageWithFormik = withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({ username: '', password: '' }),
  validate: values => {
    const errors = {}

    if (!values.username) {
      errors.username = 'required'
    }

    if (!values.password) {
      errors.password = 'required'
    }

    return errors
  },

  handleSubmit: async (values, { props, setStatus, setSubmitting }) => {
    try {
      props.login(await loginService(values))
      props.history.push('/home')
    } catch (e) {
      const error = e.message
      switch (error) {
        case 'user_not_found':
          setStatus({ username: 'invalid-username' })
          break
        case 'invalid_password':
          setStatus({ password: 'invalid-password' })
          break
        case 'invalid_token':
          logoutService()
          break
        default:
          break
      }
      setSubmitting(false)
    }
  }
})(SignInForm)

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
  )(SignInPageWithFormik)
)
