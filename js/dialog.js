class BaseDialog {

  constructor() {
    this.selector = ".overlay";
    this.initEvent();
  }

  /**
   * KhởI tạo sự kiện
   */
  initEvent() {
    let me = this;
    
    me.findControl(".dialog-close").click(function(){
      me.hideForm();
    });

    me.findControl("[data-command]").click(function(){
      me.hideForm();
    });

  }

  /**
   * Lưu form
   */
  saveAction() {
    let me = this;

    me.hideForm();
  }

  /**
   * Giới hạn tìm kiếm trong form
   * @param {*} selector 
   * @returns 
   */
  findControl(selector) {
    let me = this;
    return $(me.selector).find(selector);
  }

  /**
   * Ẩn form
   */
  hideForm() {
    let me = this;
    $(me.selector).hide();
  }

}

var oDialog = new BaseDialog();