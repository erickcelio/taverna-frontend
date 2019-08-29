import styled from 'styled-components'
import background from '../img/background.jpg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282A36;
  background-image: url(${background});
  color:  #44475A;
  height: 100vh
`

export default {
  Container
}
