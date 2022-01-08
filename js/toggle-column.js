class ToggleColumn {

  constructor() {
    this.selector = ".toggle-popup";
    this.parent = oFormBase;
    this.initEvent();
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
    $(me.selector).dialog( "close" );
  }

}

var oToggleColumn = new ToggleColumn();