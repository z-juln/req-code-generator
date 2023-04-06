// @ts-check
const { default: reqCodeGenerator } = require('../../dist');

reqCodeGenerator({
  apiName: 'searchMovies',
  apiDesc: '模糊搜索电影',
  url: 'https://www.npmjs.com/search',
  method: 'POST',
  query: [
    { name: 'q', type: 'string', required: true },
  ],
  body: [
    { name: 'data', type: 'unknown', required: false },
    { name: 'page', type: 'unknown', required: false },
  ],
  stableTsTypeInputs: [
    { type: 'request', value: `curl 'https://www.npmjs.com/search?q=stable-ts-type' \
    -H 'authority: www.npmjs.com' \
    -H 'accept: */*' \
    -H 'accept-language: zh-CN,zh;q=0.9' \
    -H 'cache-control: no-cache' \
    -H 'cookie: wub=Fe26.2**2dd12d3477c19cfa7bdb4ae1a9850083ef13da31becaf16d77f7075bfd5baf3d*YCN_nph1g2Z9hXyxHNvXbw*emTKtx9_kuAfp40781PM_09_4kZuOmBKoSSYgcTu6l18-z5T4uI8fDxlN1OlselVs5iwcr8Vd38WXKu99V9UMezZyvKZLenmm3TPmAb9Khv6C5aDI3kXiHJe6h_Xac5w**1d790576437838952895c685fcc86e4365056f84c7cd08085b7afd683105bd1c*Va7mtbFkioFY8K-enFemKWuxyClpVIQgqaWUMsYLh3Y; cs=6-ff7GDm5HYHwxogirJlMGMf3kpT80tWgWSKWKOidAN; __cfruid=4e98642b3aff798341efcf650ae8a5d00d4e1ba9-1680170679; __cf_bm=gif7RKWXTSYSsl.k4lxn2B1QH6nJVd0RK2d0zgFiB8c-1680775809-0-ASRy25XBloxj1vlGYZ6dzKGAS2VrwiDPTbHRdHEZb6H2kqPG4LqXGU8oiC3sJEEgdytm6/eNT8DfS7IEITUYF/4=' \
    -H 'manifest-hash: c560ca1a827082356297' \
    -H 'pragma: no-cache' \
    -H 'referer: https://www.npmjs.com/' \
    -H 'sec-ch-ua: "Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-fetch-dest: empty' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-site: same-origin' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36' \
    -H 'x-requested-with: XMLHttpRequest' \
    -H 'x-spiferack: 1' \
    --compressed` }
  ],
})
  .then(console.log)
  .catch(console.log);
