
class ManageInfoAsset extends FormBase {
  constructor() {
    super();
    let me = this;
    me.fileName = "asset-info";
    me.myInit();
    me.findControl("#btnAddAsset").click(() => {
      me.addAction();
    });
    me.createFocusTrap(me.$dialog);
  }

  getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
  };

  myInit() {
    let me = this;
    let status = this.getUrlParameter("status");
    let myStatusValue = null;
    switch(status) {
      case "available":
        myStatusValue = "Sẵn sàng sử dụng";
        break;
      case "using":
        myStatusValue = "Đang sử dụng";
        break;
      case "broken":
        myStatusValue = "Hỏng hóc";
        break;
      case "sold":
        myStatusValue = "Thanh lý";
        break;
    }

    if(myStatusValue) {
      me.findControl("#cboStatus").val(myStatusValue);
      me.findControl("[data-control=searchControl]").trigger("click");
    }
    
  }

  /**
   * @override
   * Hàm khởi tạo giá trị mặc định
   */
  initProperty() {
    let me = this;
    me.$table = me.findControl('#table');
    me.$dialog = me.findControl('#dialog-overlay');
    me.$msgBox = me.findControl('#msg-popup-overlay');

    me.data = manageInfoAssetData;

    me.cboGroupSource = [
      "Mặt bằng",
      "Máy móc",
      "Xe cộ",
      "Khác"
    ];

    me.cboStatusSource = [
      "Sẵn sàng sử dụng",
      "Đang sử dụng",
      "Hỏng hóc",
      "Mất",
      "Thanh lý"
    ];

    me.findControl("[data-control=autocomplete]").each((index, item) => {
      if(!$(item).data("autocomplete")) {
        $(item).data("autocomplete", true);
      }
      let source = $(item).data("source");
      $(item).autocomplete({
        source: me[source] || []
      });
    });

    me.findControl("#selectExportDataType").selectmenu({
      change: function( event, data ) {
        let value = $(this).val(); 
        me.$table.bootstrapTable('refreshOptions', {
          exportDataType: value,
          exportOptions: {
            fileName: function() {
              return `${me.fileName}_${value}`;
            }
          },
        });
      }
    });
  }


  /**
   * Hàm khởi tạo
   */
   initTable() {
    let me = this;

    let $container = me.findControl(".content-table");
    me.$table.data("height", $container.height());

    me.$table.bootstrapTable('destroy').bootstrapTable({
      exportOptions: {
        fileName: function() {
          return `${me.fileName}_all`;
        }
      },
      buttons: me.handleTableCustomButtons.bind(me)
    });
    

    /**
     * hàm lấy dữ liệU trong bảng
     * @returns data
     */
    me.$table.getData = function() {
      let data = this.bootstrapTable("getData");
      return data.map((x, index) => {
        return {...x, index : index}
      })
    }

    /**
     * Sửa dữ liệu trong bảng (trong row cần có index là stt dữ liệu trong bảng)
     * @param {object} row Dữ liệu cần sửa
     */
    me.$table.updateRow = function(row) {
      this.bootstrapTable('updateRow', {index: row.index, row: row});
      search();
    }

    /**
     * Thêm dữ liệu vào bảng
     * @param {object} row Dữ liệu cần thêm
     */
    me.$table.insertRow = function(row) {
      this.bootstrapTable('insertRow', {index: 0, row: row});
    }

    me.$table.bootstrapTable('load', me.data);
    me.$table.bootstrapTable('resetView');

    me.$table.off('click').on("click", "[data-command]", function () {
      let command = $(this).data("command");
      let row = $(this).closest("tr");
      let data = me.$table.getData();
      let dataRow = data[row.data("index")];
      me.itemGridActionClick(command, dataRow, data, row, me.$table);
    });

    let search = function() {
      let dataSearch = {};
      me.findControl("input[data-search-field]").each((index, item) => {
        dataSearch[$(item).data("search-field")] = $(item).val();
      });
      me.search(dataSearch);
    }
    me.findControl("[data-control=searchControl]").click(search);

    me.$table.bootstrapTable('resetView');
  }


  /**
   * Hàm xử lý sự kiện button trên bảng
   * @param {string} command command
   * @param {object} dataRow dữ liệu dòng
   * @param {array} data dữ liệu bảng
   * @param {el} row element dòng
   * @param {el} grid element bảng
   */
   itemGridActionClick(command, dataRow, data, row, grid) {
    let me = this;
    switch (command) {
      case "Edit":
        me.editAction(dataRow);
        
        break;
      case "Delete":
        me.deleteAction(dataRow);
        break;
      default:
        break;
    }
  }

  /**
   * Thêm 1 số button cho table
   * @returns 
   */
  handleTableCustomButtons() {
    let me = this;
    return {
      btnDelete: {
        text: 'Xóa bản ghi được chọn',
        icon: 'fa-trash',
        event: function () {
          me.deleteManyAction();
        },
        attributes: {
          title: 'Xóa bản ghi được chọn'
        }
      },
    }
  }

  /**
   * Lấy ra danh sách index các bản ghi được chọn
   * @returns 
   */
  getIndexSelections() {
    let me = this;
    return $.map(me.$table.bootstrapTable('getSelections'), function (row) {
      return row.index
    })
  }

  /**
   * Hành động xóa bản ghi
   * @param {*} dataRow 
   */
  deleteAction(dataRow) {
    let me = this;
    if(dataRow) {
      let deleteFunc = (code) => {
        me.$table.bootstrapTable('remove', {
          field: 'code',
          values: [code]
        });
        toastr.success(`Xóa thành công.`);
      }
      showPopupMsg(`<span>Bạn có chắc chắn muốn xóa <b>tài sản ${dataRow.code} - ${dataRow.name}</b> hay không?</span>`, deleteFunc.bind(me, dataRow.code), "danger");
    }
    
  }

  /**
   * Hành động xóa nhiều bản ghi
   */
  deleteManyAction() {
    let me = this;
    let indexes = me.getIndexSelections();
    if(indexes == null || indexes.length == 0) {
      toastr.info("Bạn cần chọn bản ghi để thực hiện thao tác này.");
    } else {

      let deleteManyByIndexes = () => {
        me.$table.bootstrapTable('remove', {
          field: 'index',
          values: indexes
        });
        toastr.success(`Xóa thành công ${indexes.length} bản ghi.`);
      }
      showPopupMsg(`<span>Bạn có chắc chắn muốn xóa <b>${indexes.length} bản ghi đã chọn</b> hay không?</span>`, deleteManyByIndexes, "danger");
    }
  }

  /**
   * Hành động sửa bản ghi
   */
  editAction(dataRow) {
    let me = this;
    me.$dialog.find(".text-header").html("Chỉnh sửa thông tin tài sản");
    me.$dialog.show();

    // me.$dialog.find("[data-control=autocomplete]").each((index, item) => {
    //   let source = $(item).data("source");
    //   $(item).autocomplete(me[source]);
    // });

    me.$dialog.find(".dialog").data("formType", "edit");

    me.recordRow = dataRow;
    me.$dialog.find("[data-field]").each((index, el) => {
      let field = $(el).data("field");
      $(el).val(dataRow[field]);
    });

    // focus ô đầu tiên
    me.$dialog.find("[data-field]")[0].focus();
  }

  /**
   * Hành động nhấn nút thêm
   */
   addAction() {
    let me = this;
    me.$dialog.find(".text-header").html("Thêm tài sản mới");
    me.$dialog.show();
    me.$dialog.find(".dialog").data("formType", "add");

    me.recordRow = JSON.parse(JSON.stringify(manageInfoAssetEmptyObject));
    me.recordRow.id = me.generateNewId();
    me.recordRow.code = me.generateNewAssetCode();

    // bind dữ liệu mặc định và reset form
    me.$dialog.find("[data-field]").each((index, el) => {
      let field = $(el).data("field");
      $(el).val(me.recordRow[field]);
    });

    // focus ô đầu tiên
    me.$dialog.find("[data-field]")[0].focus();
  }

  /**
   * Gen mã tài sản mới
   * @returns mã tài sản mới
   */
  generateNewAssetCode() {
    let me = this;
    let convertToNumber = (code) => {
      let res = parseInt(code.substr(2));
      if(isNaN(res)) {
        throw "Invalid code";
      }
      return res;
    }

    let data = me.$table.getData();
    let newCodeNumber = Math.max(...data.map(x => convertToNumber(x.code))) + 1;
    if(newCodeNumber < 10) {
      newCodeNumber = `0${newCodeNumber}`;
    }
    return `TS${newCodeNumber}`;
  }

  /**
   * Gen id mới
   * @returns id mới
   */
  generateNewId() {
    let me = this;
    let data = me.$table.getData();
    return Math.max(...data.map(x => x.id) + 1);
  }

  /**
   * tạo focus trap
   */
  createFocusTrap($container) {
    let $firstControl = $container.find("[data-focus=first]");
    let $lastControl = $container.find("[data-focus=last]");
    $firstControl.on('keydown', (e) => {
      var keyCode = e.keyCode || e.which;
      if (e.shiftKey && keyCode == '9') {
        e.preventDefault();
        $lastControl.focus();
      }
    });

    $lastControl.on('keydown', (e) => {
      var keyCode = e.keyCode || e.which;
      if (!e.shiftKey && keyCode == '9') {
        e.preventDefault();
        $firstControl.focus();
      }
    });
  }
}

var oFormBase = new ManageInfoAsset();
var app = this;
