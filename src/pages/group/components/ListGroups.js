import Colors from '../../../assets/styles/Colors'
import CreateGroupModal from './CreateGroupModal'
import GroupMenu from './GroupMenu'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  min-height: 160px;
  flex-direction: column;
  background-color: ${Colors.darkPurple};
`

const GroupsAndIconsContainer = styled.div`
  margin: 20px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupsContainer = styled.div`
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const Title = styled.div`
  margin-top: 8px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  position: relative;
`
class ListGroups extends React.Component {
  constructor (props) {
    super(props)
    this.updateGroup = this.updateGroup.bind(this)
    this.handleArrowClick = this.handleArrowClick.bind(this)
    this.state = {
      groups: [],
      groupsIndex: 0,
      rightArrowEnabled: false,
      leftArrowEnabled: false,
      showModal: false
    }
  }

  componentDidMount () {
    this.updateGroup()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.allGroups !== prevProps.allGroups) {
      this.updateGroup()
    }
  }

  async updateGroup () {
    const { groupsIndex } = this.state
    const { allGroups } = this.props
    console.log(groupsIndex)
    const groupsNumber = allGroups.length / 3
    if (groupsNumber > 1) {
      const selectedGroups = []
      if (groupsIndex + 3 <= allGroups.length) {
        selectedGroups.push(allGroups[groupsIndex])
        selectedGroups.push(allGroups[groupsIndex + 1])
        selectedGroups.push(allGroups[groupsIndex + 2])
        this.setState({ groups: selectedGroups })
        this.setState({ leftArrowEnabled: groupsIndex > 0 })
        this.setState({ rightArrowEnabled: groupsIndex + 3 < allGroups.length })
      } else {
        await this.setState({ groupsIndex: groupsIndex - 1 })
        this.updateGroup()
      }
    } else {
      console.log(groupsIndex + 3 <= allGroups.length)
      if (!groupsIndex + 3 <= allGroups.length) {
        await this.setState({ groupsIndex: groupsIndex - 1 })
        this.updateGroup()
      } else {
        this.setState({ leftArrowEnabled: groupsIndex > 0 })
        this.setState({ rightArrowEnabled: groupsIndex + 3 < allGroups.length })
      }
      this.setState({ groups: [...allGroups] })
    }
  }

  async handleArrowClick (type) {
    const { groupsIndex, rightArrowEnabled, leftArrowEnabled } = this.state
    let groupsIndexValue = groupsIndex
    if (type === 'increment' && rightArrowEnabled) {
      groupsIndexValue++
    } else if (type === 'decrement' && leftArrowEnabled) {
      groupsIndexValue--
    }
    await this.setState({ groupsIndex: groupsIndexValue })
    this.updateGroup()
  }

  render () {
    const { handleArrowClick } = this
    const {
      showModal,
      groups,
      rightArrowEnabled,
      leftArrowEnabled
    } = this.state
    console.log('groups =>', groups)
    return (
      <Container>
        <Title>
          <span>Groups</span>
          <Icon
            style={{ position: 'absolute', right: '20px', top: '7px' }}
            type="plus"
            onClick={() => this.setState({ showModal: true })}
          />
        </Title>
        <GroupsAndIconsContainer>
          <Icon
            onClick={() => handleArrowClick('decrement')}
            type="left"
            style={{ fontSize: 24, color: leftArrowEnabled ? 'white' : 'gray' }}
          />
          <GroupsContainer>
            {groups.map(group => (
              <GroupMenu group={group} />
            ))}
          </GroupsContainer>
          <Icon
            onClick={() => handleArrowClick('increment')}
            type="right"
            style={{
              fontSize: 24,
              color: rightArrowEnabled ? 'white' : 'gray'
            }}
          />
        </GroupsAndIconsContainer>
        <CreateGroupModal
          visible={showModal}
          onClose={() => this.setState({ showModal: false })}
        />
      </Container>
    )
  }
}

ListGroups.propTypes = {
  allGroups: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    allGroups: state.groups
  }
}

export default injectIntl(
  connect(
    mapStateToProps,
    null
  )(ListGroups)
)
