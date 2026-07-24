const http = require('http');

const tests = [
  { path: '/', name: 'index.html' },
  { path: '/styles.css', name: 'styles.css' },
  { path: '/app.js', name: 'app.js' },
  { path: '/products.js', name: 'products.js' },
  { path: '/dr_dimpal_yadav.png', name: 'dr_dimpal_yadav.png' },
  { path: '/seetaram_shop.jpg', name: 'seetaram_shop.jpg' }
];

let results = [];
let done = 0;

function checkAll() {
  results.sort((a, b) => a.name.localeCompare(b.name));
  console.log('\n=== LOCALHOST:8080 RESOURCE TEST ===');
  results.forEach(r => {
    console.log(r.ok + ' [HTTP ' + r.status + '] ' + r.name);
  });
  const allPass = results.every(r => r.ok === 'PASS');
  console.log('\n' + (allPass ? '✓ ALL TESTS PASSED - Zero 404 errors!' : '✗ SOME TESTS FAILED!'));
  process.exit(allPass ? 0 : 1);
}

tests.forEach(test => {
  const req = http.request(
    { host: 'localhost', port: 8080, path: test.path, method: 'HEAD' },
    res => {
      const status = res.statusCode;
      results.push({ name: test.name, status, ok: status === 200 ? 'PASS' : 'FAIL' });
      done++;
      if (done === tests.length) checkAll();
    }
  );
  req.on('error', e => {
    results.push({ name: test.name, status: 'CONN_ERR', ok: 'FAIL' });
    done++;
    if (done === tests.length) checkAll();
  });
  req.end();
});
