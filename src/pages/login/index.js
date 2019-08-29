/* eslint-disable no-unused-vars */
import React from 'react'
import {
  FormBox,
  FormDiv,
  Header,
  HeaderH2,
  HeaderP,
  SpanIcon,
  Input,
  Div,
  Button
} from './styles'
import { FaUnlock, FaUserAlt } from 'react-icons/fa'

export default function Login () {
  return (
    <FormBox >
      <FormDiv>
        <Header>
          <HeaderH2>ESH</HeaderH2>
          <HeaderP>Seu canal de comunicação empresarial.</HeaderP>
        </Header>
        <Div>
          <SpanIcon><FaUnlock /></SpanIcon>
          <Input type="text" placeholder="@UserName" required />
        </Div>
        <Div>
          <SpanIcon><FaUserAlt /></SpanIcon>
          <Input type="password" placeholder="Password" required />
        </Div>
        <Button>Log in</Button>
        <Button pass >Forgot Password</Button>
        <Button submits >Log up</Button>
      </FormDiv>
    </FormBox>
  )
}
