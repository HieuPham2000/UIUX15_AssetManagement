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
      me.showToast(Constants.Validate, "error");
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
  async hideForm() {
    let me = this;
    if (me.checkChange()) {
      await showPopupMsg('Dữ liệu đã thay đổi, bạn có muốn lưu không?',  me.saveAction.bind(me));
    }
    $(me.selector).parent().hide();

    
  }

  checkChange() {
    let me = this;
    let formData = me.getFormData();
    let originalData = me.parent.recordRow;

    for (let key in formData) {
      if (formData[key] != originalData[key]) {
        return true;
      }
    }
    return false;
  }

}

var oDialog = new BaseDialog();