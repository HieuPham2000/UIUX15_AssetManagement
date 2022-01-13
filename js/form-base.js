class FormBase {

  constructor() {

    this.selector = "body";

    this.initProperty();
    this.initFromProperty();
    this.initValidate();
    if (this.$table?.length > 0) {
      this.initTable();
    }
    this.initEvent();
    this.initAutocomplete();
  }

  initFromProperty() {
    let me = this;
    me.rootEl = $(me.selector);
  }

  /**
   * Khởi tạo validate
   */
  initValidate() {
    let me = this;

    if (me.rootEl.prop("tagName") == "FORM") {

      jQuery.extend(jQuery.validator.messages, {
        required: "Trường này không được phép để trống!",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });

      me.isForm = true;
      me.rootEl.validate({
        invalidHandler: function(event, validator) {
          var errors = validator.numberOfInvalids();
          if (errors) {
            var message = errors == 1
              ? 'You missed 1 field. It has been highlighted'
              : 'You missed ' + errors + ' fields. They have been highlighted';
            $("label.error").text(message);
          }
        }
      });
    }
  }

  /**
   * Hàm validate
   */
  validate() {
    let me = this;
    if (me.isForm) {
      return me.rootEl.valid();
    }
  }

  /**
   * Hàm khởi tạo giá trị mặc định
   */
  initProperty() {
    let me = this;
    me.$table = me.findControl('#table');
    me.$dialog = me.findControl('#dialog-overlay');
    me.$msgBox = me.findControl('#msg-popup-overlay');
    me.data = [
      {
        code: "TS01",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS02",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS03",
        name: "Máy lạnh",
        incidentType: "Hỏng hóc",
        status: "Đang xử lý",
        content: "Hỏng nặng"
      },
      {
        code: "TS04",
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
   * Giới hạn tìm kiếm trong form
   * @param {*} selector 
   * @returns 
   */
  findControl(selector) {
    let me = this;
    return $(me.selector).find(selector);
  }

  /**
   * Hàm khởi tạo
   */
  initTable() {
    let me = this;
    me.$table.bootstrapTable({
      formatShowingRows: function (pageFrom, pageTo, totalRows) {
        return `Hiển thị <b>${pageTo - pageFrom + 1}/${me.data.length}</b>`
      }
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

    me.findControl("[data-control=toggleColumn]").click(function() {
      let options = me.$table.bootstrapTable("getOptions");
      let toggleColumn = options.columns[0].filter(x => x.toggle);

      let togglePopup = $(".toggle-popup");
      let toggleContent = togglePopup.find('.toggle-content');

      toggleContent.html('');
      toggleColumn.forEach(x => {
        toggleContent.append(`
        <div class="toggle-row">
          <input data-field="${x.field}" class="toggle-checkbox" id="${x.field}" ${x.visible ? 'checked' : ''} type="checkbox">
          <label class="toggle-label" for="${x.field}">${x.title}</label>
        </div>`)
      });

      togglePopup.dialog();
    })
  }

  search(dataSearch) {
    let me = this;
    if (!dataSearch) {
      me.$table.bootstrapTable('loadData', me.data);
      return;
    }
    let cloneData = $.extend([], me.data);
    let search = {};
    for (let key in dataSearch) {
      let filter = cloneData.filter(x => x[key]?.includes(dataSearch[key]));
      search[key] = filter.map(x => x[key]);
    }
    me.$table.bootstrapTable('filterBy', search);
  }

  /**
   * Hàm khởi tạo sự kiện
   */
  initEvent() {
    let me = this;

  }

  /**
   * Hàm khởi tạo autocomplete
   */
  initAutocomplete() {
    let me = this;
    
    me.findControl(`[data-control="autocomplete"]`).each((index, item) => {
      if(!$(item).data("autocomplete")) {
        $(item).data("autocomplete", true);

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
  
      }

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
        me.recordRow = dataRow;
        me.$dialog.find("[data-field]").each((index, el) => {
          let field = $(el).data("field");
          $(el).val(dataRow[field])
        })
        break;
      case "Delete":
        showPopup(() => console.log('Xóa'))
        break;
      default:
        break;
    }
  }

  /**
   * Lấy dữ liệu từ form
   */
  getFormData() {
    let me = this;
    let formData = {};

    me.findControl("[data-field]").each((index, item) => {
      let $item = $(item);
      let tag = $item.prop("tagName");

      if (tag == "INPUT" || tag == "TEXTAREA") {
        if ($item.prop("type") == "checkbox") {
          formData[$item.data("field")] = $item.prop("checked");
        }
        else {
          formData[$item.data("field")] = $item.val();
        }
      }
      
    })

    return formData;
  }

  /**
   * 
   * show Toast
   */
  showToast(msg) {
    Toastify({
      text: msg
    }).showToast();
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

var app = this;