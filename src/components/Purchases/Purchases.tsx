import React, { useEffect, useState } from 'react';
import styles from './styles/Purchases.module.scss';
import { ButtonPay } from '../ButtonPay';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { Product } from '../../models';
import { calculateTotal } from '../../utilities/calcultate';

export interface PurchasesInterface { }

const Purchases: React.FC<PurchasesInterface> = () => {

	const shoppingCarStore = useSelector((store: AppStore) => store.ShoppingCar)
	const [totalPay, setTotalPay] = useState<number>(0)

	/* useEffect(() => {
		let test = localStorage.getItem("shoppingCar")
		setTotalPay(calculateTotal(shoppingCarStore))
	},[])
 */
	useEffect(() => {
		setTotalPay(calculateTotal(shoppingCarStore))
	}, [shoppingCarStore])


	return (
		<div className={styles.Purchases}>
			<div className="contentTextStore">
				<span className="textStore">Shopping Cart</span>
			</div>
			{/* bucle */}

			{
				shoppingCarStore && shoppingCarStore.length === 0 ?
					<div>
						no hay productos en el carro de compras.
					</div>
					:

					shoppingCarStore.map((items: Product) =>
						<div className={`d-flex ${styles.boxPrdsCar} `} key={items.id}>
							<div className={styles.boxAmountTotal}>
								<span className={styles.amountTotal} > {items.amount} </span>
							</div>
							<div className={styles.imgTotal}>
								<img src={items.imagn} className="img" />
							</div>
						</div>
					)

			}
			<div className={styles.botTotalPay}>
				<span className={styles.total}>Total:</span>
				<span className={styles.pay}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalPay)} </span>
			</div>
			<ButtonPay />
		</div>
	);
};

export default Purchases;

