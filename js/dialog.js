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

    // $(me.selector).on("keydown", async function(e){
    //   if(e.ctrlKey && e.which == 83) {
    //     me.saveAction();
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //   } else if (e.which == 27) {
    //     await me.hideForm();
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //   }
    // });
    
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

    let saveData = $.extend(me.parent.recordRow, me.getFormData());

    let formType = $(me.selector).data("formType");
    if(formType == "add") {
      me.parent.$table.insertRow(saveData);
      me.showToast(Constants.AddSuccess);
    } else {
      me.parent.$table.updateRow(saveData);
      me.showToast(Constants.EditSuccess);
    }
    me.hideForm(true);
  }

  /**
   * Ẩn form
   */
  async hideForm(suspendCheckChange = false) {
    let me = this;
    if (!suspendCheckChange && me.checkChange()) {
      // await showPopupMsg('Dữ liệu đã thay đổi, bạn có muốn lưu không?',  me.saveAction.bind(me));
      await showPopupConfirmBeforeClose(me.saveAction.bind(me), me.hide.bind(me));
    }
    me.hide();
  }

  hide() {
    let me = this;
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