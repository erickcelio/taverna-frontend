import GroupInfo from './components/GroupInfo'
import ListGroups from './components/ListGroups'
import SideBarSecondary from './components/SideBarSecondary'
import UserInfo from './components/UserInfo'
import { actions } from '../../store/ducks/groups'
import { getMyGroupsService } from '../../services/group'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

const Container = styled.div`
  width: 100%;
  color: white;
  height: 100%;
  display: flex;
`

const GroupPage = () => {
  const dispatch = useDispatch()

  const getMyGroups = async () => {
    const { group: groups } = await getMyGroupsService()
    dispatch(actions.setGroups({ groups }))
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
