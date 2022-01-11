var popup = $('#msg-popup-overlay').clone();
$('#msg-popup-overlay').remove();

function showPopup(func = function(){}) {
  let clone = popup.clone();
  clone.appendTo('body');
  clone.show();
  
  clone.find('[data-command=Save]').click(func);
  clone.find('[data-command=Save]').click(hidePopup);
  clone.find('[data-command=Cancel]').click(hidePopup);
  clone.find('.popup-close').click(hidePopup);
}

function hidePopup() {
  $('#msg-popup-overlay').remove();
}

