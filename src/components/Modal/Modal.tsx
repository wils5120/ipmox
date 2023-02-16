import React, { useEffect, useState } from 'react';
import styles from './styles/Modal.module.scss';
import { bodyTransfer, PayMethod } from '../../models';
import Modal from 'react-modal';
import { BsShieldFillCheck, BsFillQuestionCircleFill, BsGiftFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { calculateTotal } from '../../utilities/calcultate';
import { getMerchants, getTransactions, postSaveProgress } from '../../services/payWompi';
import { body } from '../../utilities/bodyPostBuy';
import { ModalEvents } from '../ModalEvents';
import { CustomStyles } from '../../utilities';

export interface ModalPayInterface {
	modalIsOpen: boolean,
	hiddenModal: any
}

const ModalPay: React.FC<ModalPayInterface> = ({ modalIsOpen, hiddenModal }) => {

	const [payMethods, setPayMethods] = useState<PayMethod[]>([]);
	const [loadTokenMethod, setLoadTokenMethod] = useState<any>([]);
	const shoppingCarStore = useSelector((store: AppStore) => store.ShoppingCar)
	const [totalPay, setTotalPay] = useState<number>(0)
	const [modalIsOpenEvent, setIsOpenEvent] = useState<boolean>(false);
	const [titleModalEvent, setTitleModalEvent] = useState<string>();
	const [descriptionModalEvent, setDescriptionModalEvent] = useState<string>();
	const [saveReference, setSaveReference] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [aceptedAction, setAceptedAction] = useState<string>('');
	const customStyles = CustomStyles

	useEffect(() => {
		setTotalPay(calculateTotal(shoppingCarStore))
		getData()
		let methods: PayMethod[] = [
			{ img: 'https://www.elpais.com.co/files/article_main/uploads/2022/03/01/621eea2159e68.jpeg', method: 'Usa tus tarjetas', name: "NEQUI" },
			{ img: 'https://img.asmedia.epimg.net/resizer/6V8V8IMwWENmOsVwCxSvENSmBig=/1952x1098/filters:focal(606x347:616x357)/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/3ES4PWG6ANL7VK3M6K43S63MWQ.jpg', method: 'Usa tu cuenta Nequi', name: "BANCOLOMBIA_TRANSFER" },
			{ img: 'https://iq-study.com/wp-content/uploads/2022/06/1200x800_PSE.png', method: 'Usa tu cuenta de ahorros o corriente', name: "PSE" },
		]
		setPayMethods(methods)
	}, [])

	const getData = async () => {
		setLoadTokenMethod(await getMerchants())
	}

	const openModalEvent = () => {
		setIsOpenEvent(true);
	}

	const closeModalEvent = () => {
		setIsOpenEvent(false);
	}


	const methodOfPay = async (method: string) => {
		setIsLoading(true)
		const bodyData: bodyTransfer = body;
		let referenRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
		bodyData.acceptance_token = loadTokenMethod.data.presigned_acceptance.acceptance_token
		bodyData.payment_method.type = method
		bodyData.amount_in_cents = totalPay
		bodyData.reference = referenRandom.toString()
		bodyData.payment_method.sandbox_status = method === "BANCOLOMBIA_TRANSFER" ? "APPROVED" : "DECLINED"
		await validateResponse(bodyData)
		openModalEvent()
		setSaveReference(body.reference)
		setIsLoading(false)
	}


	const validateResponse = async (bodyData: bodyTransfer) => {
		let res = await postSaveProgress(bodyData)
		if (res.error) {
			setDescriptionModalEvent(res.error.messages?.payment_method ? res.error.messages?.payment_method.type ? res.error.messages?.payment_method.type[0] : "Este metodo de pago no esta funcional actualmente, seleccione otro metodo de pago."  : res.error.messages?.valid_amount_in_cents ? res.error.messages?.valid_amount_in_cents[0] : "Error desconocido, por favor vuelva a intentarlo")
			setTitleModalEvent(res.error && res.error.type === "INPUT_VALIDATION_ERROR" ? "Campos invalidos" : "Error!!")
			setAceptedAction('closeModalEvent')
		}else{
			setDescriptionModalEvent("Se ha realizado el pago exitosamente!!")
			setTitleModalEvent("Exitoso")
			setAceptedAction('validateStatusTranfer')
		}
	}

	const validateStatusTranfer = async (reference: string) => {
		let resData = await getTransactions(reference)
		if (resData && resData.data.length > 0) {
			if (resData.data[0].status === "APPROVED") {
			let urlSuccess = resData.data[0].payment_method.extra.async_payment_url
			closeModalEvent()
			setIsLoading(true)
			localStorage.clear()
			hiddenModal()
			window.location.href = urlSuccess
			}else{
				validateStatusTranfer(saveReference)
				setIsLoading(true)
			}
		}
	}

	const aceptedFunction = (valid: string) => {
		if (valid !== "") {
			let funtions: any = {
				validateStatusTranfer: validateStatusTranfer(saveReference),
				closeModalEvent: closeModalEvent()
			}
			funtions[valid]
		}

	}


	return (
		<div className={styles.Modal}>
			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				ariaHideApp={false}
				contentLabel="Example Modal"
			>
				{
					isLoading ?
						<div className="spinner-container">
							<div className="loading-spinner">
							</div>
						</div>
						:
						<div>
							<div className='titleTest'>pruebas</div>
							<div className='boxMethodTex d-flex'>
								<span className='textMethod'>Escoge metodo de pago</span>
								<MdCancel size={25} color="silver" className='iconModals' onClick={hiddenModal} />
							</div>
							<div className='boxGift'>
								<BsGiftFill size={35} color='#ee6c00' />
								<span className='textGift'>Tienda WayBOx</span>
							</div>
							<div className='contentPrincePay'>
								<span className='textPays'>PAGO A </span>
								<span className='storeWompi'>TIENDA WOMPI</span>
								<div className='d-flex'>
									<div className='boxLeftBuyTotal'>
										<span className='LeftBuyTotal'>COP </span>
										<span className='LeftBuyTotal text-bold '>$ {totalPay} </span>
									</div>
									<div className='boxLeftBuyTotal text-end'>
										<BsFillQuestionCircleFill size={20} color="silver" />
									</div>
								</div>
							</div>
							<div className='boxMethodsPay'>
								{
									payMethods.map((item: PayMethod, index) =>
										<div className='d-flex box-shadow' key={index} onClick={() => methodOfPay(item.name)} >
											<div className="modalBoxImg">
												<img src={item.img} className="img" />
											</div>
											<div className='text-box-methods'>
												<span> {item.method} </span>
											</div>
										</div>
									)
								}
							</div>
							<div className='box-footer-modal'>
								<BsShieldFillCheck color='silver' className={styles.iconPay} />
								<span className='textFooterSize color-second'>PAGOS SEGUROS POR</span>
								<span className='textFooterSize text-bold color-main'>WOMPI</span>
							</div>
						</div>
				}

			</Modal>
			<ModalEvents modalIsOpen={modalIsOpenEvent} hiddenModal={closeModalEvent} title={titleModalEvent} Description={descriptionModalEvent} aceptedFunction={aceptedFunction} aceptedAction={aceptedAction} />
		</div>
	);
};

export default ModalPay;

