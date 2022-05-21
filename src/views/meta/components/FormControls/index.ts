import type { App } from 'vue'
import Amount from './Amount/index.vue'
import Calculation from './Calculation/index.vue'
import DateDuration from './DateDuration/index.vue'
import InputTable from './InputTable/index.vue'
import OrgSelect from './OrgSelect/index.vue'
import OrgTransfer from './OrgTransfer/index.vue'
import TimeDuration from './TimeDuration/index.vue'
const components = [
  Amount,
  Calculation,
  TimeDuration,
  DateDuration,
  OrgTransfer,
  OrgSelect,
  InputTable
]

const install = function ( app:App ) {
  components.map( component => {
    app.component( component.name, component )
  } )
}

export default {
  install
}