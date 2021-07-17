
async function start() {
  const stockData = await getStockData()
  const dataPoints1 = await getStockData(), dataPoints2 = [], dataPoints3 = await getStockCloseData();
  var stockChart = new CanvasJS.StockChart("chartContainer", {
    exportEnabled: true,
    theme: "light2",
    charts: [
      {
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return ""
            }
          }
        },
        data: [{
          name: "Price (in EUR)",
          yValueFormatString: "#,###.##",
          axisYType: "secondary",
          type: "candlestick",
          risingColor: "green",
          fallingColor: "red",
          dataPoints: dataPoints1
        }]
      },
      {
        height: 100,
        toolTip: {
          shared: true
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY2: {
          prefix: "€",
          title: "LTC/EUR"
        },
        legend: {
          horizontalAlign: "left"
        },
        data: [{
          yValueFormatString: "€#,###.##",
          axisYType: "secondary",
          name: "LTC/EUR",
          dataPoints: dataPoints2
        }]
      },
      {
        height: 100,
        toolTip: {
          shared: true
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY2: {
          prefix: "€",
          title: "LTC/EUR"
        },
        legend: {
          horizontalAlign: "left"
        },
        data: [{
          yValueFormatString: "€#,###.##",
          axisYType: "secondary",
          name: "LTC/EUR",
          dataPoints: dataPoints2
        }]
      }
    ],
    navigator: {
      data: [{
        color: "grey",
        dataPoints: dataPoints3
      }],
      slider: {
        minimum: new Date(2018, 06, 01),
        maximum: new Date(2021, 05, 20)
      }
    }
  });
  $.getJSON("https://canvasjs.com/data/docs/ltceur2018.json", function (data) {
    for (var i = 0; i < data.length; i++) {
      // dataPoints1.push({ x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)], color: data[i].open < data[i].close ? "green" : "red" });;
      dataPoints2.push({ x: new Date(data[i].date), y: Number(data[i].volume_eur), color: data[i].open < data[i].close ? "green" : "red" });
      // dataPoints3.push({ x: new Date(data[i].date), y: Number(data[i].close) });
    }

    console.log(stockData);
    console.log(dataPoints2);
    stockChart.render();
  });
}


start()


function getStockData() {
  return fetch('./2330.json').then(e => e.json()).then(res => res.map(e => {
    let date = e[0].split('/')
    date = `${(+date[0] + 1911)}-${date[1]}-${date[2]}`
    const x = new Date(date)
    const open = parseFloat(e[3])
    const high = parseFloat(e[4])
    const low = parseFloat(e[5])
    const close = parseFloat(e[6])
    const y = [open, high, low, close]
    const color = open < close ? "green" : "red"
    return { x, y, color }
  }))
}

function getStockCloseData() {
  return fetch('./2330.json').then(e => e.json()).then(res => res.map(e => {
    let date = e[0].split('/')
    date = `${(+date[0] + 1911)}-${date[1]}-${date[2]}`
    const x = new Date(date)
    const y = parseFloat(e[6])
    return { x, y }
  }))
}