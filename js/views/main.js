$(function() {
  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  // $('.dev-feat').click(function() {
  //   Toast.fire({
  //     icon: 'info',
  //     title: 'Tính năng đang phát triển.'
  //   })
  // });
  $('.dev-feat').click(function() {
    toastr.info("Tính năng đang phát triển.");
  });
});