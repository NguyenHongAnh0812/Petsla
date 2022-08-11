const product_listId=[];
var sumNumber=0;
var sumPrice=0;

const exitBtn = document.querySelector(".exitIcon")
exitBtn.addEventListener("click", function () {
    document.querySelector(".fullScreen").style.display = "none"
    document.querySelector(".cartJs").style.display = "none"
    document.querySelector("body").style.overflow = "scroll"
})
const exitBtn1 = document.querySelector(".fullScreen")
exitBtn1.addEventListener("click", function () {
    document.querySelector(".fullScreen").style.display = "none"
    document.querySelector(".cartJs").style.display = "none"
    document.querySelector("body").style.overflow = "scroll"
})
const showBtn = document.querySelector(".header__two-btn")
showBtn.addEventListener("click", function () {
    document.querySelector(".fullScreen").style.display = "block"
    document.querySelector(".cartJs").style.display = "block"
    document.querySelector("body").style.overflow = "hidden"
})

function addItems(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    if (product_listId[index].number == 0) {
        product_listId[index].number+=1;
        document.getElementsByClassName('cartjs_item')[index].style.display = 'flex';
    }
    else {
        product_listId[index].number+=1;
        document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
        document.getElementsByClassName('cartjs_item__title-price')[index].innerHTML = (product_listId[index].number * price).toLocaleString('vi-VN');
        document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML=product_listId[index].number;    
    }
    if(product_listId[index].number==1)document.getElementsByClassName('pop')[index].style.border = '1px solid #f5f5f5'
    else document.getElementsByClassName('pop')[index].style.border = '1px solid #e69646'
    sumNumber+=1;
    document.querySelector('.cartJS_header-number').innerHTML=sumNumber;
    document.querySelector('.header__two-btn-num').innerHTML=sumNumber;
    sumPrice+=price;
    document.querySelector('.sumPrice1').innerHTML=sumPrice.toLocaleString('vi-VN');
    if (sumNumber==0) {
        document.querySelector('.notCart').style.display = 'flex' ;
    }
    else
    {
        document.querySelector('.notCart').style.display = 'none' ;
    }
}

function plusItem(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    product_listId[index].number+=1;
    document.getElementsByClassName('pop')[index].style.border = '1px solid #e69646'
    document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
    document.getElementsByClassName('cartjs_item__title-price')[index].innerHTML = (product_listId[index].number * price).toLocaleString('vi-VN');
    document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML=product_listId[index].number;
    sumNumber+=1;
    document.querySelector('.cartJS_header-number').innerHTML=sumNumber;
    sumPrice+=price;
    document.querySelector('.sumPrice1').innerHTML=sumPrice.toLocaleString('vi-VN');
    document.querySelector('.header__two-btn-num').innerHTML=sumNumber;
}

function minusItem(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    if(product_listId[index].number>1)
        {
            if(product_listId[index].number==2)document.getElementsByClassName('pop')[index].style.border = '1px solid #f5f5f5'
            product_listId[index].number-=1;
        document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
        document.getElementsByClassName('cartjs_item__title-price')[index].innerHTML = (product_listId[index].number * price).toLocaleString('vi-VN');
        document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML=product_listId[index].number;
        sumNumber-=1;
        document.querySelector('.cartJS_header-number').innerHTML=sumNumber;
        sumPrice-=price;
        document.querySelector('.sumPrice1').innerHTML=sumPrice.toLocaleString('vi-VN');
        document.querySelector('.header__two-btn-num').innerHTML=sumNumber;
        if (sumNumber==0) {
            document.querySelector('.notCart').style.display = 'flex' ;
        }
        else
        {
            document.querySelector('.notCart').style.display = 'none' ;
        }
    }
    else{}
}

function removeCart(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    sumNumber-=product_listId[index].number;
    product_listId[index].number = 0;
    document.getElementsByClassName('cartjs_item')[index].style.display = 'none';
    document.querySelector('.cartJS_header-number').innerHTML=sumNumber;
    sumPrice-=(product_listId[index].number * price);
    document.querySelector('.sumPrice1').innerHTML=sumPrice.toLocaleString('vi-VN');
    document.querySelector('.header__two-btn-num').innerHTML=sumNumber;
    if (sumNumber==0) {
        document.querySelector('.notCart').style.display = 'flex' ;
    }
    else
    {
        document.querySelector('.notCart').style.display = 'none' ;
    }
    console.log(sumNumber)
}



// API list
const url = "http://petsla-api.herokuapp.com/products/";
fetch(url) 
    .then(response => response.json())
    .then(data => {
        renderList(data);
    })
    .catch(Error => {
        console.log(Error);
    })
const renderList = (data) => {
    let listBlock = document.querySelector('.row');
    let htmlProduct = data.map(item => {
        item.image = "http://petsla-api.herokuapp.com" + item.images;
        product_listId.push(
            {
                id: item.id, 
                number: 0, 
                htmlCart: 
                `<div class="cartjs_item">
                <div class="cartjs_item__count">
                    <div class="add" onclick="plusItem(${item.id}, ${item.price})">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <span class="cartjs_item__countNumber">1</span>
                    <div class="pop" onclick="minusItem(${item.id}, ${item.price})">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                </div>
                <div class="cartjs_item__img">
                    <img class="js__img" style="width:100%" src="${item.image}" alt="">
                </div>
                <div class="cartjs_item__title">
                    <div class="cartjs_item__title-name">
                    ${item.product_name}
                    </div>
                    <div style="front-size=.8rem;" class="cartjs_item__title-price">
                    ${item.price.toLocaleString('vi-VN')}
                    </div>
                    <div class="cartjs_item__title-count">
                        <div class="cartjs_item__title-count--title">
                            Số lượng :
                        </div>
                        <div class="cartjs_item__title-count--count">
                            1
                        </div>
                    </div>
                </div>
                <div onclick="removeCart(${item.id}, ${item.price})" class="cartjs_item__clear">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>`
            });
       
        return `<div class="col l-3 m-4 s-6">
            <div class="product-item">
                <a href="./PetItem.html" target="_blank">
                    <img src="${item.image}" alt="" class="product-item-bgr">
                </a>
                <div class="product-content">
                    <div class="product-content-desc">
                        <a href="./PetItem.html" target="_blank">
                            <span class="title">${item.product_name}</span>
                        </a>
                         <div class="price">${item.price.toLocaleString('vi-VN')}</div>
                    </div>
                        <div class="product-content-cart">
                        <div class="buy-btn">
                            <div class="icon-buy">
                                <i class="buy-icon fa-solid fa-bag-shopping"></i>
                            </div>
                            <span>Buy now</span>
                         </div>
                        <div onclick="addItems(${item.id}, ${item.price})"  class="cart-btn">
                            <i  class="cart-icon fa-solid fa-cart-shopping icon-cart"></i>
                            <span class="hidden-text-cart">Add to Cart</span>
                        </div>
                    </div>
                 </div>
            </div>
        </div>`
    })
    listBlock.innerHTML = htmlProduct.join('');
    renderCart();
}
const renderCart = () => {
    let blockCart = document.querySelector('.cartjs_itemParent');
    let htmlRenderCart = product_listId.map(item => {
        return item.htmlCart;
    })
    blockCart.innerHTML = htmlRenderCart.join('');
}
