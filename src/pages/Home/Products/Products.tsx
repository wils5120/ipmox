import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../redux/states'
import { Product } from '../../../models';
import { DataProducts } from '../../Home/../../data/products'
import styles from './styles/Products.module.scss';
import store, { AppStore } from '../../../redux/store';

export interface ProductsInterface {
	showProduct: any
 }

const Products: React.FC<ProductsInterface> = ({showProduct}) => {
	const [activeProduct, setActiveProduct] = useState<string>()
	const productTotalStore = useSelector((store: AppStore) => store.product )
	const dispatch = useDispatch()

	useEffect(() => {
		let dataProducts: any = []
		dataProducts = JSON.parse(localStorage.getItem("product")!) as string
		if(dataProducts === null || dataProducts.length === 0){
			dispatch(addProduct(DataProducts))
		}
	}, [])
	
	const submitProducto = (item: Product) => {
		showProduct(item)
		setActiveProduct(item.id)
	}

	return (
		<div className={styles.Products}>
			<div className="contentTextStore">
				<span className="textStore">Store</span>
			</div>
			<div className={styles.contentCols}>
				{
					productTotalStore.map((item: Product, index) =>
						<div className={item.id === activeProduct ?  `${styles.boxProduct} ${styles.boxProductActive}` : `${styles.boxProduct}` } key={index}  onClick={(e) => submitProducto(item)} >
							<div className={styles.contexImage}>
								<span className={styles.amounts}> {item.amount}  </span>
								<img src={item.imagn} className="img" />
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
};

export default Products;

