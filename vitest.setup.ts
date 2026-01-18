// Vitest 测试环境设置文件
// 确保在测试运行前正确初始化环境

// 设置全局环境变量
if (typeof process !== 'undefined') {
  process.env.NODE_ENV = 'test'
}
