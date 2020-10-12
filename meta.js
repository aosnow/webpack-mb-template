module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      label: 'Project name'
    },
    description: {
      type: 'string',
      required: true,
      label: 'Project description',
      default: 'A mobile project'
    },
    author: {
      type: 'string',
      label: 'Author',
      default: 'mudas'
    },
    version: {
      type: 'string',
      required: true,
      label: 'Project version',
      default: '0.0.1'
    },
    environment: {
      type: 'list',
      required: true,
      label: 'Project Environment',
      default: 'none',
      choices: [
        { name: '纯净H5', value: 'none' },
        { name: '支付宝/微信内嵌（如公众号、生活号项目）', value: 'web for alipay/wechat' },
        { name: '支付宝/微信小程序', value: 'mini for alipay/wechat' }
      ]
    }
  },
  completeMessage: '{{#inPlace}}To get started:\n\n  npm install\n  npm run serve{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run serve{{/inPlace}}'
};
