const products = [
  {
    id: 'fjdkasjf',
    name: 'I-Phone 1',
    price: 11,
    quantity: 4,
    comments: [
      {
        username: 'John',
        text: 'tốt',
      },
      {
        username: 'ben',
        text: 'quá tệ',
      },
    ],
  },
  {
    id: 'fdjaklfjd',
    name: 'I-Phone 2',
    price: 5,
    quantity: 2,
    comments: [
      {
        username: 'Tom',
        text: 'Tôi thích sản phẩm này',
      },
      {
        username: 'John',
        text: 'Tôi muốn mua 5 cái',
      },
    ],
  },
  {
    id: 'andnsnd',
    name: 'I-Phone 3',
    price: 20,
    quantity: 1,
    comments: [],
  },
  {
    id: 'andnfn',
    name: 'I-Phone 4',
    price: 25,
    quantity: 4,
    comments: [],
  },
];

const cart = [];

const findProductById = (id, array) => array.find((p) => p.id === id);

const changeQuantityOfProductInListById = (id, list, number) => {
  list.forEach((i) => {
    if (i.id === id) i.quantity += number;
  });
};

const addProductToCart = (id) => {
  if (findProductById(id, products).quantity === 0) return;
  changeQuantityOfProductInListById(id, products, -1);
  if (findProductById(id, cart)) {
    findProductById(id, cart).quantity += 1;
    return;
  }
  const product = findProductById(id, products);
  cart.push({ ...product, quantity: 1 });
};

const removeProduct = (e) => {
  const productId = e.target.dataset['productId'];
  const index = cart.findIndex((p) => p.id === productId);
  const quantity = cart.find((p) => p.id === productId).quantity;
  products.forEach((p) => {
    if (p.id === productId) {
      p.quantity += quantity;
    }
  });
  cart.splice(index, 1);
  renderCart();
  renderProducts();
};

const renderCart = () => {
  let cartElement = document.querySelector('ul.cart');
  let html = '';
  if (!cart.length) {
    cartElement.innerHTML = 'Giỏ hàng trống!';
  } else {
    cart.forEach((p) => {
      html += `<li>
			<p>Tên sản phẩm: ${p.name}</p>
			<p>Giá: ${p.price}</p>
			<p>Số lượng: ${p.quantity}</p>
			<button data-product-id="${p.id}" class="btn-remove">Xóa</button>
		</li>`;
    });
    cartElement.innerHTML = html;
    const removeBtns = document.querySelectorAll('.btn-remove');
    [...removeBtns].forEach((btn) =>
      btn.addEventListener('click', removeProduct)
    );
  }
};

const renderProducts = () => {
  const productsElement = document.querySelector('ul.products');
  let html = '';
  products.forEach((p) => {
    let comments = '';
    p.comments.forEach((c) => {
      comments += `<li><p>${c.username}:${c.text}</p></li>`;
    });
    html += `
			<li id="${p.id}">
				<p>Tên sản phẩm: ${p.name}</p>
				<p>Giá: ${p.price}$</p>
				<p>Số lượng: ${p.quantity}</p>
				<p>Nhận xét: <ul>${comments ? comments : 'Chưa có nhận xét nào'}</ul><p>
				<button class="buy" data-product-id="${p.id}">Mua</button>
			</li>
		`;
  });
  productsElement.innerHTML = html;
  const buttonElements = document.querySelectorAll('.buy');
  [...buttonElements].forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset['productId'];
      addProductToCart(productId);
      renderCart();
      renderProducts();
    })
  );
};

renderProducts();
renderCart();

const toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener('click', (e) => {
  document.querySelector('.cart').classList.toggle('hidden');
});

const closeBtn = document
  .querySelector('.close')
  .addEventListener('click', (e) => {
    document.querySelector('.cart').classList.toggle('hidden');
  });
