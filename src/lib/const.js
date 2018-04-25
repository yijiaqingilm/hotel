const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const PENDING = 'PENDING'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  getRoomCalender: 'getRoomCalender',
  checkBook: 'checkBook'
}
let methods = [SUCCESS.toLowerCase(), FAILURE.toLowerCase(), PENDING.toLowerCase()]
const mutationNames = {}
for (let actionName in globalConst) {
  if (globalConst.hasOwnProperty(actionName)) {
    methods.forEach((method) => {
      if (!mutationNames[`${actionName}_${method}`]) {
        mutationNames[`${actionName}_${method}`] = `${actionName}_${method}`
      }
    })
  }
}

const pageSize = 10
export {
  globalConst,
  SUCCESS,
  FAILURE,
  PENDING,
  ERROR_UNAUTHORIZED,
  mutationNames
}
