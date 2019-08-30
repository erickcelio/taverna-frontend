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
import { FormattedMessage } from 'react-intl'

const LoginForm = props => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = props

  return (
    <FormBox onSubmit={handleSubmit}>
      <FormDiv>
        <Header>
          <HeaderH2>ESH</HeaderH2>
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
            placeholder="E-mail"
            required
          />
        </div>
        <div>
          <SpanIcon>
            <FaUnlock />
          </SpanIcon>
          <Input
            placeholder="Password"
            required
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </div>
        <Button type="submit">Log in</Button>
        <Button pass>Forgot Password</Button>
        <Button submits>Log up</Button>
      </FormDiv>
    </FormBox>
  )
}

LoginForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func
}

const LoginPageWithFormik = withFormik({
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
      console.log(e)
    }
  }
})(LoginForm)

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
)(LoginPageWithFormik)
