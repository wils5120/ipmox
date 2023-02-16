import React, { useEffect, useState } from 'react';
import styles from './styles/Navbar.module.scss';
import { FaShopify } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { calculateTotal } from '../../utilities/calcultate';



export interface NavbarInterface {
	controllView: any,
	viewDetailProduct: boolean
}

const Navbar: React.FC<NavbarInterface> = ({controllView, viewDetailProduct}) => {


	const shoppingCarStore = useSelector((store: AppStore) => store.ShoppingCar)
	const [totalPay, setTotalPay] = useState<number>(0)

	useEffect(() => {
		setTotalPay(calculateTotal(shoppingCarStore))
	},[shoppingCarStore])



	const handeleShowComponent = () => {
		viewDetailProduct = !viewDetailProduct
		controllView(viewDetailProduct)
	}

	return( 
		<div className={styles.Navbar}>
			<div className={styles.colLeft}>
				<div className={styles.buttonHomeShop}>
					<FaShopify color='white' size={40} />
				</div>
			</div>
			<div  className={styles.colLeft}>
				<div className={styles.box} >
					<div className={viewDetailProduct ? `${styles.boxGoPayInActive} ${styles.boxGoPay}`: `${styles.boxGoPayActive} ${styles.boxGoPay}` } onClick={handeleShowComponent} >
						<TiShoppingCart color={viewDetailProduct ? "#fff": '#b333c2'} size={20} className={styles.iconShop} />{/* '#b333c2' */}
						<span className={viewDetailProduct ? styles.textValueTotal: styles.textValueTotalActive }> {new Intl.NumberFormat('es-CO',{ style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(totalPay)} </span>  {/* textValueTotalActive */}
					</div>
					{
					!viewDetailProduct ?
					<div className={styles.bottonCancelPurchase} onClick={handeleShowComponent} >
						<span className={styles.iconXCancel}>X</span>
					</div>
					:
						<></>
				}
				</div>
				
			</div>
			<div></div>
		</div>
	)
};

export default Navbar;

