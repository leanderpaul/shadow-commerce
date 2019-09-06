import React from 'react';
import { MDBCol } from 'mdbreact';

import './category.styles.css';

const Category = ({ size, image, title }) => (
	<MDBCol sm={size} size='12' className='p-2'>
		<div className='category'>
			<img src={image} alt={title} className='w-100 category-image' />
			<div className='category-name'>
				<h3>{title.toUpperCase()}</h3>
				<span>SHOP NOW</span>
			</div>
		</div>
	</MDBCol>
);

export default Category;
