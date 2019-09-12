import 'antd/dist/antd.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import App from './App'
import { IntlProvider } from 'react-intl'
import React from 'react'
import ReactDOM from 'react-dom'
import messagesEn from './translations/en-us'
import messagesPt from './translations/pt-br'

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
