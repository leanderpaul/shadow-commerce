# **A P I &nbsp;&nbsp;&nbsp; R O U T E S**

## Authentication Routes

`Base route = /auth`

### **POST** /register

Registers a new user.

```js
const body = {
	firstName: String(3, 32),
	lastName: String(1, 32),
	phoneNumber: Number(10),
	email: String(8, 32),
	password: String(8, 32),
	confirmPassword: String(8, 32)
};
const successResponse = response(1200);
const errorResponse = response(1400 | 1401 | 1402 | 1403 | 1404 | 1405 | 2400 | 2401);
```

### **POST** /login

Logs the user and provides a token which is to be sent with the consequent requests to ensure that the user is authenticated.

```js
const body = {
	username: String(3, 32), // Can be phoneNumber or Email Address
	password: String(8, 32)
};
const successResponse = response(1201);
const errorResponse = response(1406 | 1407);
```

### **POST** /forgotPassword

User provides the email address or a password and a message would be sent to that with the url that can be used to change the password.

```js
const body = {
	username: String(3, 32)
};
const successResponse = response(1202);
const errorResponse = response(1406);
```

### **POST** /changePassword

user can change the password using this route after he has forgot his password.

```js
const body = {
	email: String,
	user: String(128),
	password: String,
	confirmPassword: String
};
const successResponse = response(1203);
const errorResponse = response(1404 | 1405);
```

---

## Profile Routes

`Base route = /profile`

### **GET** /

Gets the profile details of the user

```js
const successResponse = {
  ...response(2201)
  data: {
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email: String
  }
};
```

### **PUT** /

Updates the profile with the new information

```js
const body = {
	firstName: String,
	lastName: String,
	phoneNumber: String,
	email: String
};
const successResponse = response(1203);
const errorResponse = response(1400 | 1401 | 1402 | 1403 | 2400 | 2401);
```

### **POST** /changePassword

updates the password of the user

```js
const body = {
	oldPassword: String,
	newPassword: String,
	confirmNewPassword: String
};
const successResponse = response(1203);
const errorResponse = response(1404 | 1405);
```

### **GET** /transactions

get all the transactions that the user has completed previously.

```js
const params = {
	page: Number
};
const transaction = {
	tid: String,
	date: Date,
	total: Number,
	isPaid: Boolean,
	delivered: Boolean
};
const successResponse = {
	...response(2203),
	data: {
		isMore: Boolean, // To denote if there are any more transactions left
		transactions: [transaction]
	}
};
```

### **GET** /transactions/:transactionId

get the details of a particular transaction

```js
const item = {
	product: {
		pid: String,
		productName: String,
		image: String,
		price: Number
	},
	quantity: Number
};
const successResponse = {
	...response(2204),
	data: {
		transaction: {
			tid: String,
			date: Date,
			items: [item],
			total: Number,
			isPaid: Boolean,
			delivered: Boolean
		}
	}
};
```

---

## Shop Routes

`Base route = /shop`

### **GET** /

Gets the products that the user has requested for

```js
const params = {
	category: String,
	brand: String,
	name: String,
	page: Number
};
const product = {
	pid: Number,
	productName: String,
	image: String,
	brand: String,
	category: String,
	price: Number
};
const successResponse = {
	...response(3201),
	data: {
		isMore: Boolean, // To denote if there are any more products left
		products: [product]
	}
};
```

### **GET** /:productId

Gets the details of a particular product

```js
const successResponse = {
	...response(3202),
	data: {
		product: {
			pid: String,
			productName: Stirng,
			image: String,
			brand: String,
			category: String,
			description: String,
			stock: Number,
			price: Number
		}
	}
};
```

---

## Cart Routes

`Base url = /cart`

### **GET** /

Gets all the products or items in the cart

```js
const item = {
	product: {
		pid: String,
		productName: String,
		image: String,
		price: Number
	},
	quantity: Number
};
const successResponse = {
	...response(),
	data: {
		items: [item]
	}
};
```

### **POST** /

Adds a new item to the cart

```js
const body = {
	item: String, // products.pid
	quantity: Number
};
const successResponse = response(4200);
const errorResponse = response(4400 | 4401);
```

### **PUT** /

updates the cart by increasing or reducing the items in cart

```js
const body = {
	item: String, // products.pid
	quantity: Number
};
const successResponse = response(4201);
const errorResponse = response(4402 | 4403 | 4404);
```

### **DELETE** /:itemId

removes an item from the cart

```js
const successResponse = response(4202);
const errorResponse = response(4404);
```

---

## Comment Routes

`Base url = /comments`

### **GET** /:productId

Get all the comments for that particular product.

```js
const params = {
	page: Number
};
const comment = {
	byUser: String, // users.fullName
	rating: Number,
	date: Date,
	content: String
};
const successResponse = {
	...response(4202),
	data: {
		isMore: Boolean, // To denote whether are more commemts or not
		comments: [comment]
	}
};
```

### **POST** & /:productId

Add a new comment to the product

```js
const body = {
	rating: Number,
	content: String
};
const successResponse = response(5200);
const errorResponse = response(5400 | 5401 | 5402);
```

## Checkout Routes
