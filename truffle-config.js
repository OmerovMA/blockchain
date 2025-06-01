module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Стандартный порт Ganache
      network_id: "5777" // Любая сеть
    }
  },
  compilers: {
    solc: {
      version: "0.8.19", // Версия должна совпадать с pragma в контрактах
      settings: {
        optimizer: {
          enabled: true, // Включаем оптимизатор
          runs: 200 // Количество оптимизаций
        }
      }
    }
  }
};