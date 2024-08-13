module.exports = {
  apps: [
    {
      name: "vite-dev",
      script: "npm",
      args: "run dev",
      cwd: "./frontend", // 项目的前端目录
      interpreter: "node", // 使用 Node.js 作为解释器
    },
  ],
};
