
module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {targets: {node: 'current'}}],
    'next/babel',
    '@babel/preset-typescript',
  ],
}

