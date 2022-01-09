class BaseDialog extends FormBase {

  constructor() {
    super();
  }

  /**
   * Giá trị ban đầu
   */
  initProperty() {
    let me = this;
    me.parent = oFormBase;
    me.selector = ".dialog";
  }

  /**
   * KhởI tạo sự kiện
   */
  initEvent() {
    let me = this;
    
    me.findControl(".dialog-close").click(function(){
      me.hideForm();
    });

    me.findControl("[data-command=Cancel]").click(function(){
      me.hideForm();
    });

    me.findControl("[data-command=Save]").click(function(){
      me.saveAction();
    });

  }

  /**
   * Lưu form
   */
  saveAction() {
    let me = this;

    if (!me.validate()) {
      me.showToast(Constants.Validate);
      return;
    }

    let saveData = $.extend(me.parent.recordRow, me.getFormData())

    me.parent.$table.updateRow(saveData);

    me.showToast(Constants.SaveSuccess)

    me.hideForm();
  }

  /**
   * Ẩn form
   */
  hideForm() {
    let me = this;
    $(me.selector).parent().hide();
  }

}

var oDialog = new BaseDialog();