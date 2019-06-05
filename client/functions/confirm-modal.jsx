import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = (props) =>{


    return (
      <div>
        <Modal isOpen={props.showModal} >
          <ModalHeader toggle={props.toggle}>Confirm</ModalHeader>
          <ModalBody>
            You sure you want to walk this plan?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.confirm}>Yes, walk it</Button>{' '}
            <Button color="secondary" onClick={props.cancel}>Think again</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default ConfirmModal;