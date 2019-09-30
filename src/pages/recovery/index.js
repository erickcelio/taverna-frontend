import { Button, FormBox, FormDiv, Header, HeaderH2 } from './../signIn/styles'
import { Form, Icon, Input } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'

import ButtonComponent from '../../components/ButtonComponent'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../../assets/styles/'
import { withFormik } from 'formik'

const SignUpForm = props => {
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    history,
    status,
    isSubmitting,
    intl: { formatMessage }
  } = props

  const { email: emailError } = errors
  const { email: emailStatus } = status
  const hasEmailError = emailError || emailStatus ? 'error' : ''
  const emailErrorMessage =
    hasEmailError &&
    formatMessage({ id: `input.error.${emailStatus || emailError}` })

  return (
    <FormBox onSubmit={handleSubmit} noValidate>
      <FormDiv>
        <Header>
          <HeaderH2>Taverna</HeaderH2>
        </Header>
        <Form.Item validateStatus={hasEmailError} help={emailErrorMessage}>
          <Input
            prefix={<Icon type="mail" />}
            style={{ width: '280px', height: '48px' }}
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder={formatMessage({ id: 'recovery.input.email' })}
          />
        </Form.Item>
        <ButtonComponent
          style={{ backgroundColor: styles.colors.purple }}
          onClick={handleSubmit}
          loading={isSubmitting}
          loadingColor={'white'}
          type="submit"
          message={'recovery.button.submit'}
        />
        <Button style={{ margin: 0 }} onClick={() => history.push('/')} pass>
          <FormattedMessage id={'recovery.button.login'} />
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
  intl: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object
}

SignUpForm.defaultProps = {
  status: {}
}

const SignUpPageWithFormik = withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({
    email: ''
  }),
  validate: values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'required'
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'invalid-email-address'
    }

    return errors
  },

  handleSubmit: async (values, { props, setStatus }) => {
    try {
      console.log('RECOVERY')
    } catch (e) {
      console.log(e)
    }
  }
})(SignUpForm)

export default injectIntl(SignUpPageWithFormik)
