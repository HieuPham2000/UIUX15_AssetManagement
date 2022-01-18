 $.fn.bootstrapTable.locales['vi-VN'] = $.fn.bootstrapTable.locales['vi'] = {
  formatCopyRows () {
    return 'Copy Rows'
  },
  formatPrint () {
    return 'Print'
  },
  formatLoadingMessage () {
    return 'Đang tải'
  },
  formatRecordsPerPage (pageNumber) {
    return `${pageNumber} bản ghi/trang`
  },
  formatShowingRows (pageFrom, pageTo, totalRows, totalNotFiltered) {
    if (totalNotFiltered !== undefined && totalNotFiltered > 0 && totalNotFiltered > totalRows) {
      return `Hiển thị <b>${pageFrom}-${pageTo}/${totalRows}</b> bản ghi (filtered from ${totalNotFiltered} total rows)`
    }

    if(pageFrom == pageTo) {
      return `Hiển thị <b>${pageFrom}/${totalRows}</b> bản ghi`
    }
    return `Hiển thị <b>${pageFrom}-${pageTo}/${totalRows}</b> bản ghi`
  },
  formatSRPaginationPreText () {
    return 'previous page'
  },
  formatSRPaginationPageText (page) {
    return `to page ${page}`
  },
  formatSRPaginationNextText () {
    return 'next page'
  },
  formatDetailPagination (totalRows) {
    return `Showing ${totalRows} rows`
  },
  formatClearSearch () {
    return 'Clear Search'
  },
  formatSearch () {
    return 'Tìm kiếm'
  },
  formatNoMatches () {
    return 'Không có dữ liệu'
  },
  formatPaginationSwitch () {
    return 'Ẩn/ hiện thanh phân trang'
  },
  formatPaginationSwitchDown () {
    return 'Hiện thanh phân trang'
  },
  formatPaginationSwitchUp () {
    return 'Ẩn thanh phân trang'
  },
  formatRefresh () {
    return 'Làm mới'
  },
  formatToggle () {
    return 'Ẩn/ hiện'
  },
  formatToggleOn () {
    return 'Show card view'
  },
  formatToggleOff () {
    return 'Hide card view'
  },
  formatColumns () {
    return 'Ẩn/hiện cột'
  },
  formatColumnsToggleAll () {
    return 'Ẩn/ hiện tất cả'
  },
  formatFullscreen () {
    return 'Chế độ toàn màn hình'
  },
  formatAllRows () {
    return 'Tất cả'
  },
  formatAutoRefresh () {
    return 'Auto Refresh'
  },
  formatExport () {
    return 'Xuất dữ liệu'
  },
  formatJumpTo () {
    return 'GO'
  },
  formatAdvancedSearch () {
    return 'Advanced search'
  },
  formatAdvancedCloseButton () {
    return 'Close'
  },
  formatFilterControlSwitch () {
    return 'Hide/Show controls'
  },
  formatFilterControlSwitchHide () {
    return 'Hide controls'
  },
  formatFilterControlSwitchShow () {
    return 'Show controls'
  }
}

$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['vi-VN'])