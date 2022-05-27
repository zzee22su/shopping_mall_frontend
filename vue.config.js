const { defineConfig } = require('@vue/cli-service');


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    // ���Ͻ� ����
    proxy: {
      // ���Ͻ� ��û�� ���� api�� ���� �κ�
      '^/api': {
        // ���Ͻ� ��û�� ���� ������ �ּ�
        target: 'http://localhost:8090',
        changeOrigin: false,
        xfwd: true,
      },
    }
  },

})
