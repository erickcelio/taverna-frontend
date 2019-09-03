import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginService } from '../../services/auth'
import { withFormik } from 'formik'
import {
  Button,
  FormBox,
  FormDiv,
  Header,
  HeaderH2,
  HeaderP,
  Input,
  InputContainer,
  SpanIcon
} from './styles'
import { FaUnlock, FaUserAlt } from 'react-icons/fa'
import { FormattedMessage, injectIntl } from 'react-intl'

const SignInForm = props => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    history,
    intl: { formatMessage }
  } = props
  console.log(props)
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
          <InputContainer>
            <SpanIcon>
              <FaUserAlt />
            </SpanIcon>
            <Input
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder={formatMessage({ id: 'login.input.username' })}
              required
            />
          </InputContainer>
          <InputContainer>
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
          </InputContainer>
        </div>
        <Button type="submit">
          <FormattedMessage id={'login.button.login'} />
        </Button>
        <div>
          <Button pass>
            <FormattedMessage id={'login.button.forgot-password'} />
          </Button>
          <Button onClick={() => history.push('/register')} submits>
            <FormattedMessage id={'login.button.sign-up'} />
          </Button>
        </div>
      </FormDiv>
    </FormBox>
  )
}

SignInForm.propTypes = {
  values: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
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
      props.history.push('/app')
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

export default injectIntl(
  connect(
    null,
    mapDispatchToProps
  )(SignInPageWithFormik)
)
