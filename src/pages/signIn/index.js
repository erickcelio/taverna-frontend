import { Button, FormBox, FormDiv, Header, HeaderH2, HeaderP } from './styles'
import { Form, Icon, Input } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import React, { useEffect, useState } from 'react'
import { loginService, logoutService } from '../../services/auth'

import ButtonComponent from '../../components/ButtonComponent'
import PropTypes from 'prop-types'
import { authLoginAction } from '../../store/auth/actions'
import styles from '../../assets/styles/'
import { useDispatch } from 'react-redux'

const intlInputErrorPrefix = 'input.error'

const SignInForm = props => {
  const { getFieldDecorator, validateFields, setFields } = props.form

  const { formatMessage } = useIntl()
  const dispatch = useDispatch()

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    logoutService()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        setSubmitting(true)
        try {
          dispatch(authLoginAction(await loginService(values)))
          props.history.push('/home')
        } catch (e) {
          const error = e.message
          switch (error) {
            case 'user_not_found':
              setFields({
                username: {
                  value: values.username,
                  errors: [new Error(formatMessage({ id: `${intlInputErrorPrefix}.invalid-username` }))]
                }
              })
              break
            case 'invalid_password':
              setFields({
                password: {
                  value: values.password,
                  errors: [new Error(formatMessage({ id: `${intlInputErrorPrefix}.invalid-password` }))]
                }
              })
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
    })
  }

  const inputRequiredMessage = formatMessage({ id: `${intlInputErrorPrefix}.required` })

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
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: inputRequiredMessage }
              ]
            })(
              <Input
                style={{ height: '48px' }}
                prefix={<Icon type="user" />}
                placeholder={formatMessage({ id: 'login.input.username' })}
                type="text"
                name="username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: inputRequiredMessage }
              ]
            })(
              <Input
                style={{ height: '48px' }}
                prefix={<Icon type="lock" />}
                placeholder={formatMessage({ id: 'login.input.password' })}
                type="password"
              />
            )}
          </Form.Item>
        </div>
        <ButtonComponent
          style={{ backgroundColor: styles.colors.purple }}
          onClick={handleSubmit}
          loading={submitting}
          loadingColor={'white'}
          type="submit"
          message={'login.button.login'}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={() => props.history.push('/recovery')} pass>
            <FormattedMessage id={'login.button.forgot-password'} />
          </Button>
          <ButtonComponent
            style={{ backgroundColor: 'white', color: 'black', maxWidth: 160 }}
            onClick={() => props.history.push('/register')}
            message="login.button.sign-up"
          />
        </div>
      </FormDiv>
    </FormBox>
  )
}

SignInForm.propTypes = {
  history: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(SignInForm)

export default WrappedLoginForm
