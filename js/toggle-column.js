class ToggleColumn extends FormBase {

  constructor() {
    super();
    this.parent = oFormBase;
  }

  /**
   * 
   */
  initProperty() {
    let me = this;
    me.selector = ".toggle-popup";
  }

  /**
   * KhởI tạo sự kiện
   */
  initEvent() {
    let me = this;

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

      let saveData = [];

      me.findControl('input.toggle-checkbox').each((index, ele) => {
        let visible =  $(ele).prop('checked');
        let field = $(ele).data('field');
        let colData = {
          field: field,
          visible: visible
        }
        saveData.push(colData)
        if (visible) {
          me.parent.$table.bootstrapTable("showColumn", field)
        } else {
          me.parent.$table.bootstrapTable("hideColumn", field)
        }
      });
      
      me.hideForm();
    }

  /**
   * Ẩn form
   */
  hideForm() {
    let me = this;
    $(me.selector).dialog( "close" );
  }

}

var oToggleColumn = new ToggleColumn();