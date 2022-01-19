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

/**
 * Show popup xác nhận trước khi đóng form
 * @param {*} func 
 * @param {*} option type, title, content
 * @returns 
 */
 function showPopupConfirmBeforeClose(saveFunc, notSaveFunc) {

  return new Promise(function(resolve, reject) {
    let p = showPopup(() => {
      saveFunc();
      resolve();
    }, resolve, "warning");
    p.find('.text-header').html(Constants.PopupHeaderGeneral);
    p.find('.popup-body-content').html(Constants.ConfirmBeforeCloseMsg);
    p.find('.popup-footer').html(
      `
      <button data-command="Cancel" type="button" class="m-btn btn btn-outline-secondary">Hủy</button>
      <div class="my-flex-space"></div>
      <button data-command="Save" type="button" class="m-btn btn btn-success">Lưu</button>
      <button data-command="NotSave" type="button" class="m-btn btn btn-outline-secondary">Không</button>
      `
    );

    p.find('[data-command=Save]').click(saveFunc);
    p.find('[data-command=Save]').click(hidePopup);
    p.find('[data-command=NotSave]').click(notSaveFunc);
    p.find('[data-command=NotSave]').click(hidePopup);
    p.find('[data-command=Cancel]').click(() => {
      hidePopup();
    });
  })
}

/**
 * Show popup dạng danger
 * @param {*} title 
 * @param {*} msg 
 * @param {*} saveFunc 
 * @returns 
 */
function showPopupDanger(title, msg, saveFunc) {
  return new Promise(function(resolve, reject) {
    let p = showPopup(() => {
      saveFunc();
      resolve();
    }, resolve, "danger");
    p.find('.text-header').html(title);
    p.find('.popup-body-content').html(msg);
    p.find('[data-command=Save]').addClass('btn-danger');
  })
}

