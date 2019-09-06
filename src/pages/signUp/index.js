import ButtonComponent from '../../components/ButtonComponent'
import { FormattedMessage } from 'react-intl'
import InputComponent from '../../components/InputComponent'
import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { registerService } from '../../services/auth'
import styles from '../../assets/styles/'
import { withFormik } from 'formik'

import {
  Button,
  FormBox,
  FormDiv,
  Header,
  HeaderH2
} from './../signIn/styles'
import {
  faAddressCard,
  faEnvelope,
  faUnlock
} from '@fortawesome/free-solid-svg-icons'

const SignUpForm = props => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    history,
    status,
    isSubmitting
  } = props
  return (
    <FormBox onSubmit={handleSubmit} noValidate>
      <FormDiv>
        <Header>
          <HeaderH2>Taverna</HeaderH2>
        </Header>
        <div>
          <InputComponent
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={errors.name}
            invalid={errors.name}
            placeholder={'register.input.name'}
          />
          <InputComponent
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            icon={faAddressCard}
            error={errors.username || status.username}
            invalid={errors.username || status.username}
            placeholder="register.input.username"
          />
          <InputComponent
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="register.input.email"
            icon={faEnvelope}
            error={errors.email || status.email}
            invalid={errors.email || status.email}
          />
          <InputComponent
            placeholder="register.input.password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
            invalid={errors.password}
            icon={faUnlock}
          />
          <InputComponent
            placeholder="register.input.repeat-password"
            type="password"
            name="repeatPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repeatPassword}
            error={errors.repeatPassword}
            invalid={errors.repeatPassword}
            icon={faUnlock}
          />
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
  handleBlur: PropTypes.func.isRequired,
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

  handleSubmit: async (values, { props, setStatus }) => {
    try {
      const response = await registerService(values)
      props.login(response)
      props.history.push('/home')
    } catch (e) {
      const error = e.response.data.error
      switch (error) {
        case 'email_already_exists':
          console.log('here')
          setStatus({ email: 'email-already-exists' })
          break
        case 'user_already_exists':
          setStatus({ username: 'username-already-exists' })
          break
        default:
          break
      }
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

export default connect(
  null,
  mapDispatchToProps
)(SignUpPageWithFormik)
