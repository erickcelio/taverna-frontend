import background from '../img/background.jpg'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282A36;
  background-image: url(${background});
  color:  #44475A;
  overflow-y: auto;
  height: 100vh;
`

export default {
  Container
}
