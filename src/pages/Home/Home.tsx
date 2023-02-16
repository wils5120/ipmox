import React, { useState, useEffect } from 'react';
import { Purchases } from '../../components';
import { Product } from '../../models';
import { DetailProduct } from './DetailProduct';
import { Products } from './Products';
import styles from './styles/Home.module.scss';

export interface HomeInterface { 
	viewDetailProduct: boolean
}

const Home: React.FC<HomeInterface> = ({viewDetailProduct}) => {
	const [dataProducts, setDataProducts] = useState<Product>()
	const [showDetail, setShowDetail] = useState<Boolean>(true)


	useEffect(() => {
		setShowDetail(viewDetailProduct)
	},[viewDetailProduct])

	const productShow = (item: Product) => {
		setDataProducts(item)
	}

	return (
		<div className={styles.Home}>
			<div className={styles.content}>
				<Products showProduct={productShow} />
			</div>
			<div className={styles.contentRight}>
				{
					showDetail ?
						<DetailProduct dataProducts={dataProducts} />
						:
						<Purchases />
				}
			</div>
		</div>
	);
};

export default Home;

