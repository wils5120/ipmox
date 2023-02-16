import React from 'react';
import styles from './styles/ModalEvents.module.scss';
import Modal from 'react-modal';
import { CustomStyles } from '../../utilities';
import { MdCancel } from "react-icons/md";

export interface ModalEventsInterface {
	modalIsOpen: boolean,
	hiddenModal: any,
	title: any,
	Description: any,
	aceptedFunction: any,
	aceptedAction: any
}

const ModalEvents: React.FC<ModalEventsInterface> = ({ modalIsOpen, hiddenModal, title, Description, aceptedFunction, aceptedAction }) => {

	const customStyles = CustomStyles



	const controllClick  = () =>{
		aceptedFunction(aceptedAction)
	}

	return (
		<div className={styles.ModalEvents}>
			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				ariaHideApp={false}
				contentLabel="Example Modal"
			>
				<div className='contentExitModalEvent'>
					<MdCancel size={25} color="silver" className='iconModals' onClick={hiddenModal} />
				</div>
				<div className='contentModalEvent'>
					<div className='textEventTitle'> {title} </div>
					<div className='textEventDescription'> {Description} </div>
					<div className='contentButtonAcept'>
						<button className='button-accept' onClick={controllClick} >
							Aceptar
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ModalEvents;

