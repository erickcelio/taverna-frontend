import ButtonComponent from '../../components/ButtonComponent'
import PropTypes from 'prop-types'
import React from 'react'
import { actions } from '../../store/ducks/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginService } from '../../services/auth'
import styles from '../../assets/styles/'
import { withFormik } from 'formik'
import {} from './styles'
import { FormattedMessage, injectIntl } from 'react-intl'

const MainPage = props => {
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
    <div>
      <h1>PAGE APP</h1>
    </div>
  )
}

MainPage.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
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
})(MainPage)

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
