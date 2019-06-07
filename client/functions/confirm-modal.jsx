import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = (props) =>{


    return (
      <div>
        <Modal isOpen={props.showModal} >
          <ModalHeader >Confirm</ModalHeader>
          <ModalBody>
            {props.modalBodyContent}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.confirm}>{props.confirmButtonContent}</Button>{' '}
            {props.cancel ? <Button color="secondary" onClick={props.cancel}>{props.cancelButtonContent}</Button> : null}
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default ConfirmModal;