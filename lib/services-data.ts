export interface ServiceItem {
  id: string
  name: string
  unit: string
  price: number
}

export interface ServiceModule {
  id: string
  title: string
  icon: string
  items: ServiceItem[]
}

export const serviceModules: ServiceModule[] = [
  {
    id: 'wiring',
    title: 'Електропроводка та Штроблення',
    icon: 'cable',
    items: [
      { id: 'w1', name: 'Підведення дроту (відкритим) 3x2.5', unit: 'м.п.', price: 40 },
      { id: 'w2', name: 'Підведення дроту (відкритим) 5x4', unit: 'м.п.', price: 52 },
      { id: 'w3', name: 'Підведення дроту (відкритим) 5x6', unit: 'м.п.', price: 58 },
      { id: 'w4', name: 'Підведення дроту (відкритим) 5x10', unit: 'м.п.', price: 75 },
      { id: 'w5', name: 'Підведення дроту (гофра) 2.5', unit: 'м.п.', price: 55 },
      { id: 'w6', name: 'Підведення дроту (гофра) 4', unit: 'м.п.', price: 72 },
      { id: 'w7', name: 'Підведення дроту (гофра) 6', unit: 'м.п.', price: 80 },
      { id: 'w8', name: 'Підведення дроту (гофра) 10', unit: 'м.п.', price: 88 },
      { id: 'w9', name: 'Штроблення (2см) - Газоблок', unit: 'м.п.', price: 95 },
      { id: 'w10', name: 'Штроблення (2см) - Цегла', unit: 'м.п.', price: 95 },
      { id: 'w11', name: 'Штроблення (2см) - Бетон', unit: 'м.п.', price: 115 },
      { id: 'w12', name: 'Монтаж накладної коробки', unit: 'шт.', price: 350 },
      { id: 'w13', name: 'Схема у підрозетнику', unit: 'шт.', price: 350 },
    ],
  },
  {
    id: 'holes',
    title: 'Отвори та Підрозетники',
    icon: 'circle-dot',
    items: [
      { id: 'h1', name: 'Прохідний отвір до 25мм - Газоблок', unit: 'шт.', price: 250 },
      { id: 'h2', name: 'Прохідний отвір до 25мм - Цегла', unit: 'шт.', price: 375 },
      { id: 'h3', name: 'Прохідний отвір до 25мм - Бетон', unit: 'шт.', price: 500 },
      { id: 'h4', name: 'Фіксація підрозетників - Гіпсокартон', unit: 'шт.', price: 150 },
      { id: 'h5', name: 'Фіксація підрозетників - Газоблок', unit: 'шт.', price: 180 },
      { id: 'h6', name: 'Фіксація підрозетників - Цегла', unit: 'шт.', price: 200 },
      { id: 'h7', name: 'Фіксація підрозетників - Бетон', unit: 'шт.', price: 240 },
    ],
  },
  {
    id: 'panel',
    title: 'Монтаж Щита та Автоматика',
    icon: 'panel-top',
    items: [
      { id: 'p1', name: 'Корпус щита 12М', unit: 'шт.', price: 1440 },
      { id: 'p2', name: 'Корпус щита 24М', unit: 'шт.', price: 1560 },
      { id: 'p3', name: 'Корпус щита 36М', unit: 'шт.', price: 1680 },
      { id: 'p4', name: 'Корпус щита 48М', unit: 'шт.', price: 1800 },
      { id: 'p5', name: 'Корпус щита 60М', unit: 'шт.', price: 1920 },
      { id: 'p6', name: 'Автоматика - 1п АВ', unit: 'шт.', price: 215 },
      { id: 'p7', name: 'Автоматика - 2п АВ/Диф', unit: 'шт.', price: 460 },
      { id: 'p8', name: 'Автоматика - 3п АВ', unit: 'шт.', price: 675 },
      { id: 'p9', name: 'Автоматика - 4п АВ/ПЗВ', unit: 'шт.', price: 920 },
      { id: 'p10', name: 'Реле напруги', unit: 'шт.', price: 650 },
    ],
  },
  {
    id: 'fixtures',
    title: 'Фурнітура та Освітлення',
    icon: 'lightbulb',
    items: [
      { id: 'f1', name: 'Розетка / Вимикач', unit: 'шт.', price: 180 },
      { id: 'f2', name: 'Ethernet розетка', unit: 'шт.', price: 220 },
      { id: 'f3', name: 'Отвір в ГК до 70мм (1 лист)', unit: 'шт.', price: 250 },
      { id: 'f4', name: 'Отвір в ГК до 70мм (2 листи)', unit: 'шт.', price: 325 },
      { id: 'f5', name: 'Отвір в ГК 70-100мм (1 лист)', unit: 'шт.', price: 350 },
      { id: 'f6', name: 'Отвір в ГК 70-100мм (2 листи)', unit: 'шт.', price: 425 },
      { id: 'f7', name: 'Отвір прямокутний 100x100 (1 лист)', unit: 'шт.', price: 350 },
      { id: 'f8', name: 'Отвір прямокутний 100x100 (2 листи)', unit: 'шт.', price: 380 },
      { id: 'f9', name: 'Монтаж бра', unit: 'шт.', price: 650 },
      { id: 'f10', name: 'Монтаж накладних спотів', unit: 'шт.', price: 575 },
    ],
  },
  {
    id: 'led',
    title: 'LED та Спецмонтаж',
    icon: 'zap',
    items: [
      { id: 'l1', name: 'LED профіль', unit: 'м.п.', price: 200 },
      { id: 'l2', name: 'LED стрічка', unit: 'м.п.', price: 250 },
      { id: 'l3', name: 'RGB стрічка', unit: 'м.п.', price: 500 },
      { id: 'l4', name: 'Рушникосушарка', unit: 'шт.', price: 1700 },
      { id: 'l5', name: 'Модульне заземлення', unit: 'шт.', price: 12000 },
    ],
  },
]
