$(document).ready(function(){

  var cartTotal = 0
  var itemTotal = function() {
  var itemPrices = $('.item-price');
  var quantity = $('.quantity');
  cartTotal = 0; // Reset cartTotal to zero before calculating the new total
  for (i = 0; i < quantity.length; i++) {
    var price = Number($(itemPrices[i]).text().replace(/\$/,""));
    var subtotal = Number($(quantity[i]).val()) * price;
    if (subtotal !== 0) {
      $($('.item-subtotal')[i]).text("$" + subtotal.toFixed(2));
    } else {
      $($('.item-subtotal')[i]).text("$--.--");
    }
    cartTotal += subtotal;
  }
  $('.cart-total').text("$" + cartTotal.toFixed(2));
  return cartTotal;
};


  var updateCartTotal = function() {
  cartTotal = itemTotal();
  $('.cart-total').text("$" + cartTotal + ".00");
};


  var addItem = function(name, cost) {
  var newItem = $(
    '<div class="row item">' +
      '<div class="item-name col-xs-3">' +
      name +
      '</div>' +
      '<div class="item-price col-xs-2">' +
      '$' + cost + '.00' +
      '</div>' +
      '<div class="item-qty col-xs-2">' +
      '<label>qty: </label> ' +
      '<input class="quantity">' +
      '</div>' +
      '<div class="col-xs-2">' +
      '<button class="remove">Remove</button>' +
      '</div>' +
      '<div class="item-subtotal col-xs-2">$--.--</div>' +
    '</div>'
  );

  $('#item-list').append(newItem);
  itemTotal();
};


  //event handlers

  //add new//
  $(document).on('click', '#add-item', function() {
    addItem($('#name').val(),$('#cost').val());
  });

  //remove item
    $(document).on('click', '.remove', function() {
    $(this).parents('.row').remove();
    itemTotal();
    updateCartTotal();
    });

  //update cart
   $(document).on('input', '.quantity', function() {
    itemTotal();
    updateCartTotal();
  });

  //update item
  $(document).on('keydown', '#cost', function(e) {
    if (e.which == 13) { // when user presses enter key
      addItem($('#name').val(), $('#cost').val());
      updateCartTotal();
    };
  });


});