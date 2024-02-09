module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Adjust this if your backend server runs on a different port
        changeOrigin: true,
      },
    },
  }, 
  configureWebpack: {
    entry: './src/main.ts',
  }
};
