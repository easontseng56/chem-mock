// 年級篩選 + 點擊統計（Google Analytics 事件：download_paper / click_xxx）
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, Object.assign({transport_type: 'beacon'}, params));
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.classList.contains('paper')) track('download_paper', {paper: a.dataset.paper});
    else if (a.classList.contains('track')) track('click_' + a.dataset.ev, {});
  });
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
      var g = b.dataset.g;
      document.querySelectorAll('.exam').forEach(function (s) { s.hidden = !!g && s.dataset.g !== g; });
      document.querySelectorAll('.year').forEach(function (y) { y.hidden = !y.querySelector('.exam:not([hidden])'); });
    });
  });
})();
