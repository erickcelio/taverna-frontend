import { Icon, Upload, message } from 'antd'

import PropTypes from 'prop-types'
import React from 'react'
import { uploadImage } from './../../../services/upload'

function beforeUpload (file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

class UploadImage extends React.Component {
  constructor (props) {
    super(props)
    this.customRequest = this.customRequest.bind(this)
    this.state = {
      imageUrl: this.props.value || '',
      loading: false
    }
  }

  async customRequest (options) {
    this.setState({ loading: true })
    const imageUrl = await uploadImage(options.file)
    this.props.onChange(imageUrl)
    this.setState({
      imageUrl,
      loading: false
    })
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl, loading } = this.state
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={this.customRequest}
        beforeUpload={beforeUpload}
        style={{ padding: 0 }}
      >
        {imageUrl && !loading ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }
}

UploadImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default UploadImage
