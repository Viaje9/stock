const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const iconv = require('iconv-lite');
axios.get('https://isin.twse.com.tw/isin/C_public.jsp?strMode=2', {
  responseType: 'arraybuffer',
}).then(({ data }) => {
  fs.writeFile('./html.txt', iconv.decode(data, '950'), () => console.log('done'))
})



async function start() {
  const html = fs.readFileSync('./html.txt', 'utf8');
  const $ = cheerio.load(html);
  const list = Array.from($('tbody tr')).filter(item => {
    return cheerio.load(item)('td:nth-child(6)').text() === 'ESVUFR'
  }).map(item => {
    const e = cheerio.load(item, {
      xml: {
        xmlMode: true,
      }
    })
    const [id,name] = e('td:nth-child(1)').text().split('　')
    const category = e('td:nth-child(5)').text()
    return {
      id,
      name,
      category
    }
  })
  console.log(list);
  // console.log('end');
}

start()