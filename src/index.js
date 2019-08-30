import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IntlProvider } from 'react-intl'
import messagesPt from './translations/pt-br'
import messagesEn from './translations/en-us'

const messages = {
  'pt-BR': messagesPt,
  'en-US': messagesEn
}

const language = navigator.language || 'pt-br'

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
)
