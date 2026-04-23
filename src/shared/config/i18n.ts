import { createI18n } from 'vue-i18n'

const savedLocale = localStorage.getItem('adflow-locale')

const messages = {
  ru: {
    auth: {
      heroTitle: 'Управляйте рекламой как зрелый adtech-продукт',
      heroText:
        'Единая консоль для команд, бюджетов, аналитики и ежедневных решений по кампаниям.',
      welcomeBack: 'С возвращением',
      signIn: 'Вход в рабочее пространство',
      email: 'Email',
      password: 'Пароль',
      enterWorkspace: 'Войти',
    },
    navigation: {
      dashboard: 'Дашборд',
      campaigns: 'Кампании',
      reports: 'Отчёты',
      settings: 'Настройки',
    },
    dashboard: {
      badge: 'Командный обзор',
      title: 'Ad operations control center',
      subtitle:
        'Первая версия foundation уже показывает стиль, архитектуру и data-first подход будущего продукта.',
      insights: 'Быстрые инсайты',
      nextActions: 'Следующие действия',
      actions: [
        'Усилить кампании с CTR выше 3.4%',
        'Проверить перерасход в programmatic сегменте',
        'Подготовить next-step wizard для создания кампании',
      ],
    },
    campaigns: {
      badge: 'Campaigns pipeline',
      title: 'Список кампаний',
      subtitle:
        'Стартовый экран уже готов под фильтрацию, сортировку и дальнейшую интеграцию с реалистичными моками.',
      create: 'Создать кампанию',
      search: 'Поиск',
      searchPlaceholder: 'Название, канал или владелец',
    },
    reports: {
      badge: 'Analytics layer',
      title: 'Отчёты и экспорт',
      subtitle:
        'На этом этапе закладываем метрики, narrative analytics и основу под экспортные сценарии.',
      exportTitle: 'Экспорт отчёта',
      exportText: 'CSV-export добавим на следующем шаге вместе с mock API и query-моделями.',
      export: 'Экспортировать CSV',
    },
    topbar: {
      workspace: 'Основной workspace',
      role: 'Admin access',
      search: 'Поиск по сущностям, людям и отчётам',
    },
  },
  en: {
    auth: {
      heroTitle: 'Run advertising like a mature adtech platform',
      heroText:
        'A focused control center for teams, budgets, analytics, and campaign decisions.',
      welcomeBack: 'Welcome back',
      signIn: 'Sign in to your workspace',
      email: 'Email',
      password: 'Password',
      enterWorkspace: 'Enter workspace',
    },
    navigation: {
      dashboard: 'Dashboard',
      campaigns: 'Campaigns',
      reports: 'Reports',
      settings: 'Settings',
    },
    dashboard: {
      badge: 'Team overview',
      title: 'Ad operations control center',
      subtitle:
        'This first foundation already shows the visual system, architecture, and data-first direction of the product.',
      insights: 'Quick insights',
      nextActions: 'Next actions',
      actions: [
        'Scale campaigns with CTR above 3.4%',
        'Review spend anomalies in the programmatic segment',
        'Prepare the next-step create campaign wizard',
      ],
    },
    campaigns: {
      badge: 'Campaigns pipeline',
      title: 'Campaign list',
      subtitle:
        'The first list view is already ready for filters, sorting, and richer mock integrations.',
      create: 'Create campaign',
      search: 'Search',
      searchPlaceholder: 'Name, channel, or owner',
    },
    reports: {
      badge: 'Analytics layer',
      title: 'Reports and export',
      subtitle:
        'This stage establishes metrics, narrative analytics, and the foundation for export workflows.',
      exportTitle: 'Report export',
      exportText:
        'CSV export will be added in the next iteration together with mock API and query models.',
      export: 'Export CSV',
    },
    topbar: {
      workspace: 'Primary workspace',
      role: 'Admin access',
      search: 'Search entities, people, and reports',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale === 'en' ? 'en' : 'ru',
  fallbackLocale: 'en',
  messages,
})
