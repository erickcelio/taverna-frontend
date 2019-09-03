import styles from '../../assets/styles'
import styled, { keyframes } from 'styled-components'

const {
  colors: {
    orange
  },
  theme: {
    textColor
  }
} = styles

/* --------- Animations --------- */
const buttonKF = keyframes`
  0% {
    transform: translateX(1px);
  }
  100% {
    transform: translateX(5px);
  }
`
/* ------ Css ------ */

const ErrorText = styled.span`
  color: red;
`

const FormBox = styled.form`
  display: flex;
  width: 450px;
  min-height: 500px;
  height: auto;
  border-radius: 10px;
  margin: 8px auto;
  background: rgb(0, 0, 15, 0.5);
  box-shadow: 0 0 10px 2px rgba(0,0,0,0.3);
  padding: 16px;
`

const FormDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
`

const InputContainer = styled.div`
margin-top: 16px;
  display: flex;
  justify-content: center;
  align-content: center;
`

const Header = styled.div`
  display: block;
  width: 450px;
  margin: 16px auto 32px 0;
  text-align: center;
`
const HeaderH2 = styled.h2`
  font-size: 250%;
  color: ${textColor};
`
const HeaderP = styled.p`
  letter-spacing: 0.05em;
  color: #aaa;
`

const SpanIcon = styled.span`
  padding: 8px;
  background: #fff;
  color: #333;
  border-radius: 5px 0 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 240px;
  padding: 15px;
  font-size: 16px;
  color: #5e6472;
  outline: none;
  border: none;
  border-radius: 0 5px 5px 0;
  transition: 0.2s linear;
  &:focus {
    transform: translateX(-2px);
  }
`

const Button = styled.button`
  display: inline-block;
  color: #fff;
  width: 280px;
  height: 50px;
  padding: 0 20px;
  background: ${orange};
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s linear;
  margin: 7% auto;
  letter-spacing: 0.05em;
  ${props => props.submits && `
    width: 48%;
    display: inline-block;
    float: left;
    margin-left: 2%;
    background: #fff;
    color: #252537
  `}
  ${props => props.pass && `
    width: 48%;
    display: inline-block;
    float: left;
    margin-left: 2%;
    background: transparent;
    color: #fff;
  `}
  &:hover {
      transform: translatey(8px);
      box-shadow: none;
      animation: ${buttonKF} 0.4s ease-in-out infinite alternate;
    }
`

export {
  FormBox,
  FormDiv,
  Header,
  HeaderH2,
  HeaderP,
  SpanIcon,
  Input,
  Button,
  InputContainer,
  ErrorText
}
