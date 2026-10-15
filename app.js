(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, Object.assign({transport_type: 'beacon'}, params));
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.dataset.paper) track('open_paper', {paper: a.dataset.paper});
    else if (a.classList.contains('track')) track('click_' + a.dataset.ev, {});
  });
  var state = {y: '', g: ''};
  function apply() {
    var n = 0;
    document.querySelectorAll('.row').forEach(function (r) {
      var show = (!state.y || r.dataset.y === state.y) && (!state.g || r.dataset.g === state.g);
      r.hidden = !show; if (show) n++;
    });
    document.querySelectorAll('.year').forEach(function (s) { s.hidden = !s.querySelector('.row:not([hidden])'); });
    document.querySelector('.empty').hidden = n > 0;
    document.querySelector('.count').textContent = '顯示 ' + n + ' 份考卷';
  }
  document.querySelectorAll('.chip').forEach(function (b) {
    b.addEventListener('click', function () {
      var kind = 'y' in b.dataset ? 'y' : 'g';
      state[kind] = b.dataset[kind];
      document.querySelectorAll('.chip[data-' + kind + ']').forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
      apply();
    });
  });
  var tg = document.querySelector('.toggle') || document.createElement('button');
  tg.addEventListener('click', function () {
    var open = tg.textContent === '全部展開';
    document.querySelectorAll('.row:not([hidden]) details').forEach(function (d) { d.open = open; });
    tg.textContent = open ? '全部收合' : '全部展開';
  });
  apply();
})();
