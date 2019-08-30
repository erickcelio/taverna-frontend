import styled, { keyframes } from 'styled-components'
import styles from '../../assets/styles'

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

const FormBox = styled.form`
  width: 450px;
  min-height: 500px;
  height: auto;
  border-radius: 10px;
  margin: 2% auto;
  background: rgb(0, 0, 15, 0.5);
  box-shadow: 0 9px 50px hsla(20, 67%, 75%, 0.31);
  padding: 2%;
`

const FormDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
`

const Header = styled.div`
  margin: 2% auto 10% auto;
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
  background: #fff;
  color: #333;
  padding: 15px 0px 15.5px 9px;
  border-radius: 5px 0px 0px 5px;
`
const Div = styled.div`
  display: block;
`
const Input = styled.input`
  width: 240px;
  margin-top: 2%;
  padding: 15px;
  font-size: 16px;
  color: #5E6472;
  outline: none;
  border: none;
  border-radius: 0px 5px 5px 0px;
  transition: 0.2s linear;
  &:focus{
    transform: translateX(-2px);
    border-radius: 5px;
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
      transform: translatey(3px);
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
  Div,
  Button
}
