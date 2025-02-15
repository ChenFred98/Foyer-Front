import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import moment from 'moment'
import Uploader from '../../../../components/Uploader'
import {
  addImageToAsso,
  deleteImageToAsso
} from '../../../../redux/actions/asso'

class DiapoImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      visible: false
    }
  }
  addImageToAsso = () => {
    if (!this.state.image) {
      return
    }
    this.props.addImageToAsso(this.props.asso.id, this.state.image)
    this.setState({ visible: false, image: null })
  }
  deleteImage = () => {
    this.setState({ visible: false, image: null })
    this.props.deleteImageToAsso(this.props.asso.id)
  }


  render() {
    const { asso } = this.props
    const { visible } = this.state
    return (
      <div>
        <Modal
          visible={visible}
          title="Modifier l'image"
          okText='Modifier'
          onCancel={() => this.setState({ visible: false })}
          onOk={this.addImageToAsso}
        >
          <Uploader
            addImage={image => this.setState({ image })}
            removeImage={() => this.setState({ image: null })}
            initialImage={asso && asso.diapoImage}
            buttonClickedTime={moment()}
          />
          <Button type='primary' onClick={this.deleteImage}>
            Supprimer l'image
          </Button>
        </Modal>
        {asso.diapoImage && (
          <img src={process.env.REACT_APP_API + asso.diapoImage} alt='' />
        )}
        <Button type='primary' onClick={() => this.setState({ visible: true })}>
          Modifier l'image
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  addImageToAsso: (id, image) => {
    dispatch(addImageToAsso(id, image))
  },
  deleteImageToAsso: id => {
    dispatch(deleteImageToAsso(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiapoImage)
