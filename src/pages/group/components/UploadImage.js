import PropTypes from 'prop-types'
import React from 'react'
import api from '../../../services/api'
import { Icon, Upload, message } from 'antd'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

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
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      imageUrl: this.props.value || '',
      loading: false
    }
  }

  handleChange (info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      )
    }
  }

  customRequest (options) {
    const data = new FormData()
    data.append('image', options.file)
    api
      .post('/upload', data)
      .then(({ data }) => {
        this.props.onChange(data.data.url)
        options.onSuccess(data, options.file)
      })
      .catch(err => {
        console.log('Err =>', err)
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
        onChange={this.handleChange}
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
