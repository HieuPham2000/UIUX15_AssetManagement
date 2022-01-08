class FormBase {

  constructor() {

    this.initProperty();
    this.init();
    this.initEvent();
    this.initAutocomplete();

  }

  /**
   * Hàm khởi tạo giá trị mặc định
   */
  initProperty() {
    let me = this;
    me.$table = $('#table');
    me.$dialog = $('.overlay');
    me.data = [
      {
        code: "TS01",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS01",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS01",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS01",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS05",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS06",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS07",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS08",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS09",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS10",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
    ]

    me.incidentType = [
      "Hỏng hóc",
      "Mất",
    ];

    me.incidentStatus = [
      "Đang xử lý",
      "Chờ xử lý",
      "Đã xử lý"
    ];

    me.furStatus = [
      "Đang sử dụng",
      "Sẵn sàng sử dụng"
    ]
  }

  /**
   * Hàm khởi tạo
   */
  init() {
    let me = this;
    me.$table.bootstrapTable({
      formatShowingRows: function (pageFrom, pageTo, totalRows) {
        return `Hiển thị <b>${pageTo - pageFrom + 1}/${me.data.length}</b>`
      }
    });

    me.$table.bootstrapTable('load', me.data);
  }

  search(dataSearch) {
    let me = this;
    let cloneData = $.extend([], me.data);
    let search = {};
    for (let key in dataSearch) {
      let filter = cloneData.filter(x => x[key].includes(dataSearch[key]));
      search[key] = filter.map(x => x[key]);
    }
    me.$table.bootstrapTable('filterBy', search);
  }

  /**
   * Hàm khởi tạo sự kiện
   */
  initEvent() {
    let me = this;

    me.$table.on("click", "[data-command]", function () {
      let command = $(this).data("command");
      let row = $(this).closest("tr");
      let data = me.$table.bootstrapTable("getData");
      let dataRow = data[row.data("index")];
      me.itemGridActionClick(command, dataRow, data, row, me.$table);
    });

    $("[data-control=searchControl]").click(function() {
      let dataSearch = {};
      $("input[data-search-field]").each((index, item) => {
        dataSearch[$(item).data("search-field")] = $(item).val();
      });
      me.search(dataSearch);
    });
  }

  /**
   * Hàm khởi tạo autocomplete
   */
  initAutocomplete() {
    let me = this;
    
    $(`[data-control="autocomplete"]`).each((index, item) => {
      let source = $(item).data("source");

      $(item).autocomplete({
        source: me[source],
        minLength: 0,
        open: function(e, ui) {
          $(this).next(".ic-dropdown").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
        },
        close: function(e, ui) {
          $(this).next(".ic-dropdown").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
        }
      }).focus(function () {
        $(this).autocomplete("search");
      })

      $(item).parent().append(`<i class="ic-dropdown fas fa-caret-down"></i>`);

    });
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
        me.$dialog.find("[data-field]").each((index, el) => {
          let field = $(el).data("field");
          $(el).val(dataRow[field])
        })
        break;
      case "Delete":
        break;
      default:
        break;
    }
  }
}

/**
 * Hàm render button trên bảng
 * @param {*} className 
 * @param {*} command 
 * @returns 
 */
function renderRowBtn(className, command) {
  return `<i class="${className}" data-command="${command}" ></i>`
}

/**
 * Hàm render button
 * @returns 
 */
function renderActionBtn() {

  let editBtn = renderRowBtn("far fa-edit pointer", "Edit");
  let deleteBtn = renderRowBtn("far fa-trash-alt pointer", "Delete");

  return `<div class="action-grid">${editBtn + deleteBtn}</div>`;
}

var oFormBase = new FormBase;