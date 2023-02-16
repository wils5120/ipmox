import React, { useEffect, useState } from 'react';
import styles from './styles/ButtonPay.module.scss';
import { BsShieldFillCheck } from "react-icons/bs";
import ModalPay from '../Modal/Modal';


export interface ButtonPayInterface { }

const ButtonPay: React.FC<ButtonPayInterface> = () => {
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsOpen(true);
	}

	const closeModal = () => {
		setIsOpen(false);
	}


	return (
		<div className={styles.ButtonPay}>
			<div className={styles.boxBottmPayWompi}>
				<button className={styles.buttonPayWompi} onClick={openModal}>
					<BsShieldFillCheck className={styles.iconPay} />
					Pagar con Wompi
				</button>
			</div>
			<ModalPay  modalIsOpen={modalIsOpen} hiddenModal={closeModal} />
			
		</div>
	);
};

export default ButtonPay;

