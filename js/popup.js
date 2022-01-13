var popup = $('#msg-popup-overlay').clone();
$('#msg-popup-overlay').remove();

function showPopup(func = function(){}, canc = function(){}) {
  let clone = popup.clone();
  clone.appendTo('body');
  clone.show();
  
  clone.find('[data-command=Save]').click(func);
  clone.find('[data-command=Save]').click(hidePopup);
  clone.find('[data-command=Cancel]').click(() => {
    hidePopup();
    canc();
  });
  clone.find('.popup-close').click(hidePopup);
  return clone;
}

function hidePopup() {
  $('#msg-popup-overlay').remove();
}

function showPopupMsg(msg, func) {

  return new Promise(function(resolve, reject) {
    let p = showPopup(() => {
      func();
      resolve();
    }, resolve);
    p.find('.popup-body').html(msg);
  })

  

}

