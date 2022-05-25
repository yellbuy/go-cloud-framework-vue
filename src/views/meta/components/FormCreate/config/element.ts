import PROVINCE from './province.js'
export interface Rules {
  trigger: string
  enum: string
  len?: number
  max?: number
  message: string
  min?: number
  pattern: string
  required: boolean
  type: string
}

export interface WidgetForm {
  list: any[]
  config: {
    size: string
    hideRequiredAsterisk: boolean
    labelWidth: number
    labelPosition: string
  }
}

const rules: Rules = {
  trigger: 'blur',
  enum: '',
  len: undefined,
  max: undefined,
  message: '',
  min: undefined,
  pattern: '',
  required: false,
  type: 'any'
}

export const widgetForm: WidgetForm = {
  list: [],
  config: {
    size: 'default',
    hideRequiredAsterisk: false,
    labelWidth: 100,
    labelPosition: 'right'
  }
}

export const basicComponents = [
  {
    label: '单行文本',
    type: 'input',
    "cmpType":"common", //新增
    "formId": 1, //新增
    options: {
      "icon": "input", //新增
      "span": 12, //新增
      "labelWidth": 0, //新增
      "prefix-icon": "", //新增
      "suffix-icon": "", //新增
      "show-word-limit": false, //新增
      "proCondition": false, //新增
      "asSummary": false, //新增
      width: '100%', //新增
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      prepend: '',
      append: '',
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '密码框',
    type: 'password',
    "cmpType":"common", //新增
    "formId": 2, //新增
    options: {
      "icon": "password", //新增
      "span": 12, //新增
      "labelWidth": 0, //新增
      "prefix-icon": "", //新增
      "suffix-icon": "", //新增
      "show-word-limit": false, //新增
      "proCondition": false, //新增
      "asSummary": false, //新增
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      prepend: '',
      append: '',
      showPassword: true,
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '多行文本',
    type: 'textarea',
    "cmpType":"common", //新增
    "formId": 3, //新增
    options: {
      "icon": "textarea", //新增
      "span": 12, //新增
      "labelWidth": 0, //新增
      "prefix-icon": "", //新增
      "suffix-icon": "", //新增
      "show-word-limit": false, //新增
      "proCondition": false, //新增
      "asSummary": false, //新增
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      rows: 4,
      autosize: false,
      showWordLimit: false,
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '数字',
    type: 'number',
    "cmpType":"common", //新增
    "formId": 4, //新增
    options: {
      "icon": "number", //新增
      "span": 12, //新增
      "labelWidth": 0, //新增
      "prefix-icon": "", //新增
      "suffix-icon": "", //新增
      "show-word-limit": false, //新增
      "proCondition": true, //新增
      "asSummary": false, //新增
      'step-strictly': false, //新增
      'precision': undefined, //新增
      'controls-position': 'right', //新增
      'showChinese': true, //新增
      width: '',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      rules
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    "cmpType":"common", //新增
    "formId": 5, //新增
    options: {
      "icon": "radio", //新增
      "span": 12, //新增
      "labelWidth": 0, //新增
      defaultValue: '',
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    "cmpType":"common", //新增
    "formId": 6, //新增
    options: {
      "icon": "radio", //新增
      "span": 12, //新增
      "labelWidth": 0, //新增
      defaultValue: [],
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    "cmpType":"common", //新增
    "formId": 7, //新增
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      'picker-options': {
        selectableRange: '00:00:00-23:59:59'
      }, //新增
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    "cmpType":"common", //新增
    "formId": 8, //新增
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择日期',
      'picker-options': {
        selectableRange: '2000-01-01-2200-01-01'
      }, //新增
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  // {
  //   label: '时间范围',
  //   type: 'timeDuration',
  //   "cmpType":"common", //新增
  //   "formId": 9, //新增
  //   options: {
  //     showDuration: true,
  //     tagIcon: 'time-range',
  //     defaultValue: null,
  //     span: 24,
  //     labelWidth: null,
  //     style: { width: '100%' },
  //     disabled: false,
  //     clearable: true,
  //     required: false,
  //     'is-range': true,
  //     'range-separator': '至',
  //     'start-placeholder': '开始时间',
  //     'end-placeholder': '结束时间',
  //     format: 'HH:mm:ss',
  //     'value-format': 'HH:mm:ss',
  //     regList: [],
  //     changeTag: true,
  //     proCondition: true,
  //     asSummary: false
  //   }
  // },
  // {
  //   label: '日期范围',
  //   type: 'dateDuration',
  //   "cmpType":"common", //新增
  //   "formId": 8, //新增
  //   options: {
  //     showDuration: true,
  //     defaultValue: null,
  //     span: 24,
  //     labelWidth: null,
  //     style: { width: '100%' },
  //     type: 'daterange',
  //     'range-separator': '至',
  //     'start-placeholder': '开始日期',
  //     'end-placeholder': '结束日期',
  //     disabled: false,
  //     clearable: true,
  //     required: false,
  //     format: 'yyyy-MM-dd',
  //     'value-format': 'yyyy-MM-dd',
  //     readonly: false,
  //     regList: [],
  //     changeTag: true,
  //     proCondition: true,
  //     asSummary: false
  //   }
  // },
  {
    label: '评分',
    type: 'rate',
    "cmpType":"common", //新增
    "formId": 10, //新增
    options: {
      'allow-half': false, //新增
      'show-text': false, //新增
      'show-score': false, //新增
      'proCondition': true, //新增
      'asSummary': true, //新增
      defaultValue: 0,
      max: 5,
      allowHalf: false,
      disabled: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    "cmpType":"common", //新增
    "formId": 11, //新增
    options: {
      "icon": "select", //新增
      "span": 24, //新增
      "labelWidth": 0, //新增
      "proCondition": true,//新增
      defaultValue: '',
      width: '200px',
      multiple: false,
      placeholder: '',
      remote: false,
      showLabel: false,
      filterable: false,
      clearable: false,
      disabled: false,
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  },
  {
    label: '开关',
    type: 'switch',
    "cmpType":"common", //新增
    "formId": 12, //新增
    options: {
      "icon": "switch", //新增
      "span": 24, //新增
      "labelWidth": 0, //新增
      "proCondition": true,//新增
      defaultValue: false,
      disabled: false,
      activeText: '',
      inactiveText: '',
      rules
    }
  },
  {
    label: '滑块',
    type: 'slider',
    "cmpType":"common", //新增
    "formId": 13, //新增
    options: {
      "icon": "switch", //新增
      "span": 24, //新增
      "labelWidth": 0, //新增
      "proCondition": true,//新增
      defaultValue: 0,
      width: '',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      rules
    }
  },
  {
    label: '文字',
    type: 'text',
    "cmpType":"common", //新增
    "formId": 14, //新增
    options: {
      defaultValue: 'This is a text'
    }
  }
]

export const advanceComponents = [
  {
    label: '图片',
    type: 'img-upload',
    "cmpType":"common", //新增
    "formId": 21, //新增
    options: {
      'buttonText': '点击上传图片',
      'fileSize': 20,
      'sizeUnit': 'MB',
      'list-type': 'text',
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      accept: 'image/*',
      limit: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '附件',
    type: 'file-upload',
    "cmpType":"common", //新增
    "formId": 22, //新增
    options: {
      showTip: false,
      'buttonText': '点击上传附件',
      'fileSize': 20,
      'sizeUnit': 'MB',
      'list-type': 'text',
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      //accept: 'image/*',
      limit: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '富文本编辑器',
    type: 'richtext-editor',
    "cmpType":"common", //新增
    "formId": 23, //新增
    options: {
      defaultValue: '',
      width: '',
      disabled: false
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    "cmpType":"common", //新增
    "formId": 24, //新增
    options: {
      'show-all-levels': true,//新增
      'multiple': false, //新增
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      clearable: false,
      filterable: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  },
  {
    label: '省市区',
    type: 'cascader',
    "cmpType":"common", //新增
    "formId": 25, //新增
    options: {
      placeholder: '请选择',
      defaultValue: [],
      span: 24,
      labelWidth: null,
      style: { width: '100%' },
      props: {
        props: {
          multiple: false,
        }
      },
      'show-all-levels': true,
      disabled: false,
      clearable: true,
      filterable: false,
      required: false,
      options: PROVINCE,
      dataType: 'static',
      labelKey: 'label',
      valueKey: 'value',
      childrenKey: 'children',
      separator: '/',
      regList: [],
      changeTag: true,
      proCondition: false,
      asSummary: false
    }
  },
]

export const layoutComponents = [
  {
    label: '栅格布局',
    type: 'grid',
    "cmpType":"layout", //新增
    "formId": 31, //新增
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    label: '表格/明细',
    type: 'table',
    "cmpType":"layout", //新增
    "formId": 32, //新增
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
