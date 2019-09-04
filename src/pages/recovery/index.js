import { FormattedMessage } from 'react-intl'
import InputComponent from '../../components/InputComponent'
import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { withFormik } from 'formik'
import {
  Button,
  FormBox,
  FormDiv,
  Header,
  HeaderH2
} from './../signIn/styles'

const SignUpForm = props => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    history,
    status
  } = props
  return (
    <FormBox onSubmit={handleSubmit} noValidate>
      <FormDiv>
        <Header>
          <HeaderH2>Taverna</HeaderH2>
        </Header>
        <div>
          <InputComponent
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="recovery.input.email"
            icon={faEnvelope}
            error={errors.email || status.email}
            invalid={errors.email || status.email}
          />
        </div>
        <Button type="submit">
          <FormattedMessage id={'recovery.button.submit'} />
        </Button>
        <Button style={{ margin: 0 }} onClick={() => history.push('/')} pass>
          <FormattedMessage id={'recovery.button.login'} />
        </Button>
      </FormDiv>
    </FormBox>
  )
}

SignUpForm.propTypes = {
  values: PropTypes.object.isRequired,
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
