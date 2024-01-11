let bagItemObjects;
onLoad();

function onLoad(){
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemsObjects(){
  console.log(bagItems);

  bagItemObjects = bagItems.map(itemId => {
    for(let i=0;i<items.length;i++){
      if(itemId == items[i].id){
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItems(){
  let bagContainerElement = document.querySelector('.items_container_bag');
  let innerHTML = '';
  bagItemObjects.forEach(bagItems => {
    innerHTML += generateItemHtml(bagItems)
  });
  
  bagContainerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
  bagItems =  bagItems.filter(bagItemId =>bagItemId != itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHtml(item){
  return `
  <div class="item_container_bag">
          <div class="item_left_part">
            <img class="bag_item_img" src="${item.item_image}" alt="item image">
          </div>
          <div class="item_right_part">
            <div class="company">${item.company_name}</div>
            <div class="item_name_bag">${item.item_name}</div>
            <div class="price_container">
              <span class="current_price">${item.current_price}</span>
              <span class="original_price">${item.original_price}</span>
              <span class="discount_percentage">(${item.discount}% OFF)</span>
            </div>
            <div class="return_period">
              <span class="return_period_days">${item.return_period} days</span> return available
            </div>
            <div class="delivery_details">Delivery by
              <span class="delivery-details_days">${item.delivery_date}</span>
            </div>
          </div>

          <div class="remove_from_cart" onclick="removeFromBag(${item.id})">X</div>
        </div>
  `
}


function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag_summary');

  let totalItems = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  bagItemObjects.forEach(function(bagItems){
    totalMRP += bagItems.original_price;
    totalDiscount = bagItems.original_price - bagItems.current_price;
    finalPayment = totalMRP - totalDiscount;
    if(finalPayment > 500){
      return finalPayment;
    }
    else{
      finalPayment += 99;
      return finalPayment;
    }
  })

  bagSummaryElement.innerHTML = `
  <div class="bag_details_container">
          <div class="price_header">PRICE DETAILS (${totalItems} Items) </div>
          <div class="price_item">
            <span class="price_item_tag">Total MRP</span>
            <span class="price_item_value">Rs ${totalMRP}</span>
          </div>
          <div class="price_item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price_item_value priceDetail_base_discount">-Rs ${totalDiscount}</span>
          </div>
          <div class="price_item">
            <span class="price_item_tag">Convenience Fee (only for order below Rs 500)</span>
            <span class="price_item_value priceDetail_convenience">Rs 99</span>
          </div>
          <hr>
          <div class="price_footer">
            <span class="price_item_tag">Total Amount</span>
            <span class="price_item_value">Rs ${finalPayment}</span>
          </div>
        </div>
        <button class="btn_place_order">
          <div class="css_xjhrni">Place Order</div>
        </button>
      </div>
  `
}