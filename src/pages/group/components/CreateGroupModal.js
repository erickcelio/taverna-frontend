import Colors from '../../../assets/styles/Colors'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import UploadImage from './UploadImage'
import styled from 'styled-components'
import { Input, Modal } from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
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

const CreateGroupModal = ({ visible }) => {
  const [image, changeImage] = useState('')
  const [name, changeName] = useState('')

  console.log('image', image)
  console.log('name', name)
  return (
    <Modal
      closable={false}
      bodyStyle={{ backgroundColor: Colors.darkPurple }}
      visible={visible}
      footer={null}
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
      </Container>
    </Modal>
  )
}

CreateGroupModal.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default CreateGroupModal
