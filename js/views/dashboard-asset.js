// 
var chartGroupAmountCanvas = $('#chartGroupAmount').get(0).getContext('2d')
var chartGroupAmountData = {
  labels: [
    'Mặt bằng',
    'Xe cộ',
    'Máy móc',
    'Khác'
  ],
  datasets: [
    {
      data: [1, 1, 18, 0],
      backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef'],
    }
  ]
}
var donutOptions = {
  maintainAspectRatio: false,
  responsive: true,
}

new Chart(chartGroupAmountCanvas, {
  type: 'doughnut',
  data: chartGroupAmountData,
  options: donutOptions
})

// 
var chartGroupValueCanvas = $('#chartGroupValue').get(0).getContext('2d')
var chartGroupValueData = {
  labels: [
    'Mặt bằng',
    'Xe cộ',
    'Máy móc',
    'Khác'
  ],
  datasets: [
    {
      data: [50000000, 12000000, 250000000, 0],
      backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef'],
    }
  ]
}

new Chart(chartGroupValueCanvas, {
  type: 'doughnut',
  data: chartGroupValueData,
  options: donutOptions
})

// 
var chartGroupDepreciationCanvas = $('#chartGroupDepreciation').get(0).getContext('2d')
var chartGroupDepreciationData = {
  labels: [
    'Mặt bằng',
    'Xe cộ',
    'Máy móc',
    'Khác'
  ],
  datasets: [
    {
      data: [1000000, 300000, 3500000, 0],
      backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef'],
    }
  ]
}

new Chart(chartGroupDepreciationCanvas, {
  type: 'doughnut',
  data: chartGroupDepreciationData,
  options: donutOptions
});


$(() => {
  $("#switchRowStatusAssetBoxData").change(() => {
    $("#rowStatusAssetBoxData").slideToggle();
  })
})

