import ButtonComponent from '../../components/ButtonComponent'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginService } from '../../services/auth'
import styles from '../../assets/styles/'
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
/* import { FaUnlock, FaUserAlt } from 'react-icons/fa' */
import { FormattedMessage, injectIntl } from 'react-intl'

const SignInForm = props => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    history,
    isSubmitting,
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
              <Icon type="user" />
            </SpanIcon>
            <Input
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder={formatMessage({ id: 'login.input.username' })}
              required
            />
          </InputContainer>
          <InputContainer>
            <SpanIcon>
              <Icon type="lock" />
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
  values: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const SignInPageWithFormik = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validate: values => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Required'
    }

    if (!values.password) {
      errors.password = 'Required'
    }

    return errors
  },

  handleSubmit: async (values, { props }) => {
    try {
      props.login(await loginService(values))
      props.history.push('/home')
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
