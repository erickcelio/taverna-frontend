const env = process.env.REACT_APP_ENV || 'development'

export const endPoints = {
  graphql: env === 'development' ? 'https://taverna-backend-dev.herokuapp.com/' : 'http://localhost:3003'
}

export const firebaseConfig = {
  apiKey: 'AIzaSyCsSRBpSvrVN2fm9h-mXc9NPHEHQLxxqo8',
  authDomain: 'taverna-dev.firebaseapp.com',
  databaseURL: 'https://taverna-dev.firebaseio.com',
  projectId: 'taverna-dev',
  storageBucket: 'taverna-dev.appspot.com',
  messagingSenderId: '740633532914',
  appId: '1:740633532914:web:cc92f6e19625293d'
}
