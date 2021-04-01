import React, { Component } from 'react';
import { createPortal } from 'react-dom';

function Modal(props) {
    // componentDidMount() {
    //   if (this.props.isOpen) {

    //   }
    // }
        const { title, click, isOpen, data } = props;
        return createPortal(
            <div class="modal fade d-block">
  <div class={`modal-dialog ${(isOpen && "slideInDown")} animated modal-lg`}>
    <div class="modal-content">
      <div class="modal-header">
      <h4 class="modal-title" id="myModalLabel">{title}</h4>
        <button type="button" onClick={click} class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      {React.cloneElement(props.children, { data: data })}
      </div>
    </div>
  </div>
</div>,
            document.getElementById("modal_root")
        );
}

export default Modal;