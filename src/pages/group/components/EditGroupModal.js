import { Button, Input, Modal } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import UploadImage from './UploadImage'
import { editGroupRequestAction } from '../../../store/groups/actions'
import { selectGroupAction } from '../../../store/selected-group/actions'
import { selectedGroupSelector } from '../../../store/selected-group/selectors'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
`

const EditGroupModal = ({ group, visible, onClose, intl: { formatMessage } }) => {
  const { _id } = group

  const [image, changeImage] = useState(group.image)
  const [name, changeName] = useState(group.name)
  const [loading, setLoading] = useState(false)

  const selectedGroup = useSelector(selectedGroupSelector)

  const dispatch = useDispatch()

  const intlPrefix = 'groups.edit-group-modal'

  const editGroup = async () => {
    if (name !== '') {
      setLoading(true)
      dispatch(editGroupRequestAction({ group: { name, image, _id } },
        () => {
          if (selectedGroup._id === _id) {
            dispatch(selectGroupAction({ group }))
          }
          setLoading(false)
          changeImage('')
          changeName('')
          onClose()
        }, (error) => {
          console.log('Error =>', error)
          setLoading(false)
        })
      )
    }
  }

  return (
    <Modal
      closable={true}
      title={formatMessage({ id: `${intlPrefix}.title` })}
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <Container>
        <InputsContainer>
          <div>
            <Label>
              <FormattedMessage id={`${intlPrefix}.name`} />
            </Label>
            <Input
              value={name}
              onChange={({ target }) => changeName(target.value)}
            />
          </div>
          <UploadImageContainer>
            <FormattedMessage id={`${intlPrefix}.image`} />
            <UploadImage value={image} onChange={changeImage} />
          </UploadImageContainer>
        </InputsContainer>
        <ButtonContainer>
          <Button ghost type='primary' onClick={editGroup} loading={loading} >
            <FormattedMessage id={`${intlPrefix}.confirm-button`} />
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

EditGroupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
}

export default injectIntl(EditGroupModal)
