var popup = $('#msg-popup-overlay').clone();
$('#msg-popup-overlay').remove();

function showPopup(func = function(){}, canc = function(){}, type) {
  let clone = popup.clone();
  if(type) {
    clone.find(".popup").addClass(type);
  }
  
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

function showPopupMsg(msg, func, type) {

  return new Promise(function(resolve, reject) {
    let p = showPopup(() => {
      func();
      resolve();
    }, resolve, type);
    p.find('.popup-body-content').html(msg);
  })
}

/**
 * 
 * @param {*} func 
 * @param {*} option type, title, content
 * @returns 
 */
function showCustomPopup(func, option) {

  return new Promise(function(resolve, reject) {
    let p = showPopup(() => {
      func();
      resolve();
    }, resolve, option.type);
    p.find('.text-header').html(option.title);
    p.find('.popup-body-content').html(option.content);
  })
}

