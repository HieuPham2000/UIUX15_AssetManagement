
class ManageInfoAsset extends FormBase {
  constructor() {
    super();
    this.fileName = "asset-info";
    this.myInit();
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
        me.$dialog.show();
        me.recordRow = dataRow;
        me.$dialog.find("[data-field]").each((index, el) => {
          let field = $(el).data("field");
          $(el).val(dataRow[field])
        })
        break;
      case "Delete":
        me.deleteAction(dataRow);
        break;
      default:
        break;
    }
  }

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

  getIndexSelections() {
    let me = this;
    return $.map(me.$table.bootstrapTable('getSelections'), function (row) {
      return row.index
    })
  }

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

  generateNewAssetCode() {
    let data = me.$table.getData();
    data.filter()
  }
}

var oFormBase = new ManageInfoAsset();
var app = this;
