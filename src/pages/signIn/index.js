import React from 'react'
import { withFormik } from 'formik'
import { actions } from '../../store/ducks/auth'
import { FaUnlock, FaUserAlt } from 'react-icons/fa'
import { loginService } from '../../services/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  FormBox,
  FormDiv,
  Header,
  HeaderH2,
  HeaderP,
  SpanIcon,
  Input,
  Button
} from './styles'
import { FormattedMessage, injectIntl } from 'react-intl'

const SignInForm = props => {
  const { values, /* errors, */ handleChange, handleBlur, handleSubmit, intl: { formatMessage } } = props

  return (
    <FormBox onSubmit={handleSubmit}>
      <FormDiv>
        <Header>
          <HeaderH2>Taverna</HeaderH2>
          <HeaderP>
            <FormattedMessage id={'login.subtitle'} />
          </HeaderP>
        </Header>
        <div>
          <SpanIcon>
            <FaUserAlt />
          </SpanIcon>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder={formatMessage({ id: 'login.input.email' })}
            required
          />
        </div>
        <div>
          <SpanIcon>
            <FaUnlock />
          </SpanIcon>
          <Input
            placeholder={formatMessage({ id: 'login.input.password' })}
            required
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </div>
        <Button type="submit"><FormattedMessage id={'login.button.login'} /></Button>
        <Button pass><FormattedMessage id={'login.button.forgot-password'} /></Button>
        <Button submits><FormattedMessage id={'login.button.signup'} /></Button>
      </FormDiv>
    </FormBox>
  )
}

SignInForm.propTypes = {
  values: PropTypes.object,
  /* errors: PropTypes.object, */
  intl: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func
}

const SignInPageWithFormik = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validate: values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    }

    if (!values.password) {
      errors.password = 'Required'
    }

    return errors
  },

  handleSubmit: async (values, { props }) => {
    try {
      props.login(await loginService(values))
    } catch (e) {
      console.log('==>', e)
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

export default injectIntl(connect(
  null,
  mapDispatchToProps
)(SignInPageWithFormik))
