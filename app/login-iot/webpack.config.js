module.exports = {
  target: 'node',
  output: {
    libraryTarget: 'commonjs'
  },
  externals: {
    "aws-sdk": "aws-sdk"
  }
}