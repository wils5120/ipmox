import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorageType, Product } from '../../../models';
import { addProduct, addshoppingCar } from '../../../redux/states';
import store, { AppStore } from '../../../redux/store';
import styles from './styles/DetailProduct.module.scss';

export interface DetailProductInterface {
	dataProducts: any
}

const DetailProduct: React.FC<DetailProductInterface> = ({ dataProducts }) => {
	const [dataProduct, setDataProduct] = useState<Product>()
	const productTotalStore = useSelector((store: AppStore) => store.product)
	const dispatch = useDispatch()


	useEffect(() => {
		setDataProduct(dataProducts)
	}, [dataProducts])

	useEffect(() => {
		if(productTotalStore.length > 0 && dataProducts){
			setDataProduct(productTotalStore.find((data: Product) =>
			data.id === dataProducts.id ? data : undefined
		))
		}
	}, [productTotalStore])

	const filterDataShoppingCar = (data:Product[]) =>  data.filter(res => res.amount > 0)

	const handleQuantity = (item: Product, operation: string) => {
		let count = 1
		let newData = productTotalStore.map((res: Product) =>
		res.id === item.id ? { ...res, amount: operation === "sum" ? res.amount + count : res.amount !== 0 ? res.amount - count : 0 } : res) 
		dispatch(addProduct(newData))
		dispatch(addshoppingCar(filterDataShoppingCar(newData)))
		localStorage.removeItem(LocalStorageType.Product)
		localStorage.removeItem(LocalStorageType.ShoppingCar)
		localStorage.setItem(LocalStorageType.Product, JSON.stringify(newData))
		localStorage.setItem(LocalStorageType.ShoppingCar, JSON.stringify(filterDataShoppingCar(newData)))
	}

	return (
		<div className={styles.DetailProduct}>
			{
				dataProduct && productTotalStore ?
					<>
						<div className="contentTextStore">
							<span className="textStore">Product</span>
						</div>
						<div className={styles.boxImgAmount}>
							<span className={styles.textAmount}> {dataProduct.amount} </span>
							<div className={styles.contentDetailProduct}>
								<img src={dataProduct.imagn} className="img" />
							</div>
						</div>

						<div>
							<div className={styles.boxDescriptionPrice}>
								<div className={styles.boxPrice}>
									<span className="text-bold"> {dataProduct.name} </span>
									<span className={`${styles.textPrice} text-bold`}>{new Intl.NumberFormat('es-CO',{ style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(dataProduct.price)} </span>
								</div>
								<div className={styles.boxAddProduct}>
									<span className={styles.button} onClick={() => handleQuantity(dataProduct, "less")}> - </span>
									<span className={`${styles.button} ${styles.buttonActive} `} onClick={() => handleQuantity(dataProduct, "sum")}> + </span>
								</div>

							</div>
							<span className={styles.descriptPrd}> {dataProduct.description} </span>
						</div>
					</>
					:
					<div className={styles.contentTextStoreTop}>
						<span className={styles.textChoise}>please cheack product on the list</span>
					</div>


			}

		</div>
	);
};

export default DetailProduct;

