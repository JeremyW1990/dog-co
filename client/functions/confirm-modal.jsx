import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import '../css/confirm-modal.css';

const ConfirmModal = (props) =>{

    return (
      <div>
        <Modal isOpen={props.showModal} >
          <ModalHeader >Confirm</ModalHeader>
          <ModalBody>
            {props.modalBodyContent}
          </ModalBody>
          <ModalFooter>
            <Button outline className='btn-white' onClick={props.confirm}>{props.confirmButtonContent}</Button>{' '}
            {props.cancel ? <Button onClick={props.cancel}>{props.cancelButtonContent}</Button> : null}
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default ConfirmModal;