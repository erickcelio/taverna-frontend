import Colors from '../../../assets/styles/Colors'
import PropTypes from 'prop-types'
import UploadImage from './UploadImage'
import { actions } from '../../../store/ducks/groups'
import { createGroupService } from '../../../services/group'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const ButtonContainer = styled.div`
  margin-top: 8px;
`

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  text-align: center;
`

const UploadImageContainer = styled.div`
  margin-bottom: 8px;
`

const CreateGroupModal = ({ visible, onClose }) => {
  const [image, changeImage] = useState('')
  const [name, changeName] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const createGroup = async () => {
    setLoading(true)
    if (image !== '' && name !== '') {
      const { group } = await createGroupService({ name, image })
      dispatch(actions.addGroup({ group }))
    }
    setLoading(false)
    changeImage('')
    changeName('')
    onClose()
  }

  return (
    <Modal
      closable={true}
      bodyStyle={{ backgroundColor: Colors.darkPurple }}
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <Container>
        <UploadImageContainer>
          <UploadImage onChange={changeImage} />
        </UploadImageContainer>
        <div>
          <Label>Group Name</Label>
          <Input
            value={name}
            onChange={({ target }) => changeName(target.value)}
            placeholder={'Name'}
          />
        </div>
        <ButtonContainer>
          <Button onClick={createGroup} loading={loading} >
            Criar Grupo
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

CreateGroupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default CreateGroupModal
