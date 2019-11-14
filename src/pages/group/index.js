import React, { useEffect } from 'react'

import GroupInfo from './components/GroupInfo'
import ListGroups from './components/ListGroups'
import SideBarSecondary from './components/SideBarSecondary'
import UserInfo from './components/UserInfo'
import { getMyGroupsService } from '../../services/group'
import { setGroupsAction } from '../../store/groups/actions'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  width: 100%;
  color: white;
  height: 100%;
  display: flex;
`

const GroupPage = () => {
  const dispatch = useDispatch()

  const getMyGroups = async () => {
    const groups = await getMyGroupsService()
    dispatch(setGroupsAction({ groups }))
  }

  useEffect(() => {
    getMyGroups()
  })

  return (
    <Container>
      <SideBarSecondary>
        <ListGroups />
        <GroupInfo />
        <UserInfo />
      </SideBarSecondary>
    </Container>
  )
}

export default GroupPage
