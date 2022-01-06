class BaseDialog {

  constructor() {
    this.initEvent();
    this.selector = ".overlay";
  }

  /**
   * KhởI tạo sự kiện
   */
  initEvent() {
    let me = this;
    
    $(".dialog-close").click(function(){
      me.hideForm();
    });

    $("[data-command]").click(function(){
      me.hideForm();
    });

  }

  hideForm() {
    let me = this;
    $(me.selector).hide();
  }

}

var oDialog;
$(document).ready(function () {
  oDialog = new BaseDialog();
});