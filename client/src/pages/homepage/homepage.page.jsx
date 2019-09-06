import React from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';

import Category from '../../components/category/category.component';

class HomePage extends React.Component {
	state = {
		categories: [
			{ title: 'Mobiles', size: '6', image: require('../../resources/images/mobile.jpg') },
			{ title: 'Laptops', size: '6', image: require('../../resources/images/laptop.jpg') },
			{ title: 'Desktops', size: '4', image: require('../../resources/images/desktop.jpg') },
			{ title: 'Accessories', size: '4', image: require('../../resources/images/accessories.jpg') },
			{ title: 'Games', size: '4', image: require('../../resources/images/games.jpg') }
		]
	};

	render() {
		const { categories } = this.state;
		return (
			<MDBContainer>
				<MDBRow>
					{categories.map(({ title, image, size }, index) => (
						<Category title={title} image={image} size={size} key={index + 1} />
					))}
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default HomePage;
