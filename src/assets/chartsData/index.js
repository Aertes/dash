import {
  defaultOption,
  chartTypeOne,
  chartTypeTwo,
  chartTypeThree,
  chartTypeFour,
  chartTypeFive
} from '../../assets/chartsStyle/index'
import xhrUrls from '../../assets/config/xhrUrls'
import {get, post, uploadPost} from '../../assets/config/http'

//表一 OverView
function dataOvCmaSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.tableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDataName.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvComB2BSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.tableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDataName.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvComB2CSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.tableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDataName.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvCrmSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CRM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.tableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CRM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDataName.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvRevSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_RV_SEARCH, data)
      .then(res => {
        let data = res.data.data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_RV_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDataName.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}


//表二
function data(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartX.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

//表三
function data(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartX.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

//表四
function data(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartX.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

//表五
function data(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartX.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        for (let i = 0; i < num; i++) {
          that.DData.push([data.chartX[i], data.chartDate[i].data[i]])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}


export {
  dataOvCmaSearch,
  dataOvComB2BSearch,
  dataOvComB2CSearch,
  dataOvCrmSearch,
  dataOvRevSearch
}
