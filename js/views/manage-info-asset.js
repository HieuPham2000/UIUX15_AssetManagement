
class ManageInfoAsset extends FormBase {
  constructor() {
    super();
    this.fileName = "asset-info";
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

    me.findControl("#cboGroup").autocomplete({
      source: me.cboGroupSource
    });

    me.findControl("#cboStatus").autocomplete({
      source: me.cboStatusSource
    });

    me.findControl("#selectExportDataType").selectmenu();

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
          return me.fileName;
        }
      },
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

    me.$table.on("click", "[data-command]", function () {
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

  
}

var oFormBase = new ManageInfoAsset();
var app = this;