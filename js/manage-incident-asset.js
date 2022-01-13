class ManageIncident extends FormBase {

  constructor() {
    super();
    this.selector = "body";
  }

  initProperty() {
    let me = this;
    super.initProperty();

    me.data = me.generateDatas(32);
  }

  generateDatas(number) {
    let me = this;
    
    let fakeData = [];
    for (let i = 0; i < number; i++) {
      fakeData.push(me.generateData(i));
    }

    return fakeData;
  }

  generateData(index) {
    let me = this;
    const assetName = ['Tivi', 'Tủ lạnh', 'Xe máy', 'Ô tô', 'Điện thoại', 'Máy lạnh', 'Máy giặt'];
    const assetProp = ['Cũ', 'Sony', 'Panasonic', 'LG', 'Suzuki', 'Honda'];
    const reportBy = ['Nguyễn Minh Tuân', 'Phạm Trung Hiếu', 'Phạm Hữu Anh Quốc'];
    const content = ['Đang kiểm tra', 'Có lỗi xảy ra', 'Không biết lý do', 'Không tìm được vấn đề'];
    
    let fakeData = {
      assetCode: 'TS' + index,
      incidentCode: 'SC' + index,
      assetName: assetName[Math.floor(Math.random() * assetName.length)] + ' ' + assetProp[Math.floor(Math.random() * assetProp.length)],
      incidentType: me.incidentType[Math.floor(Math.random() * me.incidentType.length)],
      reportBy: reportBy[Math.floor(Math.random() * reportBy.length)],
      reportDate: moment().format('YYYY-MM-DD'),
      status: me.incidentStatus[Math.floor(Math.random() * me.incidentStatus.length)],
      assetStatus: me.furStatus[Math.floor(Math.random() * me.furStatus.length)],
      content: content[Math.floor(Math.random() * content.length)],
    }

    return fakeData;
  }

}

var oFormBase = new ManageIncident();

