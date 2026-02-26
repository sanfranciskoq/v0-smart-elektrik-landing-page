import { LucideIcon, Lightbulb, Thermometer, ShieldCheck, Zap } from 'lucide-react'

export interface TechnicalSolution {
    icon: LucideIcon
    title: string
    description: string
}

export interface Project {
    id: number
    title: string
    subtitle: string
    image: string
    about: string
    technicalSolutions: TechnicalSolution[]
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'ЖК RiverStone',
        subtitle: 'Повний електромонтаж квартири',
        image: '/images/project-1.jpg',
        about: 'Повний комплекс електромонтажних робіт у сучасній квартирі...',
        technicalSolutions: [
            { icon: Zap, title: 'Силове розведення', description: 'Монтаж кабельних ліній та щита.' }
        ]
    },
    {
        id: 2,
        title: 'Котедж в Ірпені',
        subtitle: 'Розумний будинок',
        image: '/images/project-2.jpg',
        about: 'Проєкт реалізований для приватного будинку площею 220 м². Основним завданням було створення єдиної екосистеми управління освітленням, кліматом та безпекою. Ми інтегрували інтелектуальну систему, яка дозволяє власнику керувати всіма функціями будинку з одного додатка, навіть перебуваючи за кордоном.',
        technicalSolutions: [
            {
                icon: Lightbulb,
                title: 'Розумне освітлення',
                description: 'Сценарне керування світлом (режими «Вечір», «Кіно», «Відпустка»).'
            },
            {
                icon: Thermometer,
                title: 'Клімат-контроль',
                description: 'Автоматичне регулювання температури в кожній кімнаті через керування термоголовками та кондиціонерами.'
            },
            {
                icon: ShieldCheck,
                title: 'Безпека',
                description: 'Інтеграція датчиків протікання води з автоматичним перекриттям та відеоспостереження.'
            },
            {
                icon: Zap,
                title: 'Енергощит',
                description: 'Збірка силового щита Schneider Electric з автоматичним резервним живленням.'
            }
        ]
    },
    {
        id: 3,
        title: 'ЖК Новопечерський Двір',
        subtitle: 'Дизайнерське освітлення',
        image: '/images/project-3.jpg',
        about: 'Реалізація складних систем освітлення...',
        technicalSolutions: []
    },
    {
        id: 4,
        title: 'Офіс IT-компанії',
        subtitle: 'Комерційний електромонтаж',
        image: '/images/project-4.jpg',
        about: 'Електромонтаж офісного приміщення...',
        technicalSolutions: []
    },
    {
        id: 5,
        title: 'Приватний будинок',
        subtitle: 'Зовнішнє освітлення ділянки',
        image: '/images/project-5.jpg',
        about: 'Підсвітка фасаду та ландшафту...',
        technicalSolutions: []
    }
]
