import { manageInfoAssetData } from "../../data/manage-info-asset-data";

class ManageInfoAsset extends FormBase {
  constructor() {
    super();
  }

  /**
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
  }
}

var ManageInfoAsset = new ManageInfoAsset;
var app = this;