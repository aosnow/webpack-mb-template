module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      { useBuiltIns: 'entry', corejs: 3, modules: false, node: 'current' }
    ]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: name => `${name}/style/less`
    }, 'vant']
  ]
};
