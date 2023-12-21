if (
  [
    'rivers.chaitin.cn',
    'dev.rivers.ctopt.cn',
    '127.0.0.1',
    'localhost',
  ].includes(document.domain)
) {
  window.is_river = true;
  var _czc = _czc || [];
  var cnzzTag = document.createElement('script');
  cnzzTag.src = 'https://s4.cnzz.com/z.js?id=1281132544&async=1';
  document.head.append(cnzzTag);

  var riverTag = document.createElement('script');
  riverTag.src = 'https://rivers.chaitin.cn/main-header.js';
  document.head.append(riverTag);

  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.paddingTop = '64px';
  });
}
