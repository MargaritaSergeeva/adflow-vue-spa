import { createI18n } from 'vue-i18n'

const savedLocale = localStorage.getItem('adflow-locale')

const messages = {
  ru: {
    auth: {
      eyebrow: 'AdFlow Access',
      heroTitle: 'Управляйте рекламой как зрелый adtech-продукт',
      heroText:
        'Единая консоль для команд, бюджетов, аналитики и ежедневных решений по кампаниям.',
      registerHeroTitle: 'Запускайте workspace для команды, ролей и рекламных операций',
      registerHeroText:
        'Создайте рабочее пространство для команды, доступов и ежедневных рекламных операций.',
      recoveryHeroTitle: 'Восстановите доступ к рабочему пространству без потери контекста',
      recoveryHeroText:
        'Подготовили безопасный сценарий восстановления, чтобы быстро вернуть команде доступ к данным и кампаниям.',
      welcomeBack: 'С возвращением',
      signIn: 'Вход в рабочее пространство',
      signInShort: 'Войти',
      signOut: 'Выйти',
      registerTitle: 'Создать workspace',
      registerSubtitle: 'Новая команда',
      recoveryTitle: 'Восстановление пароля',
      recoverySubtitle: 'Доступ к аккаунту',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      fullName: 'Полное имя',
      companyName: 'Компания',
      workspaceTitle: 'Название workspace',
      role: 'Роль',
      timezone: 'Часовой пояс',
      interfaceLanguage: 'Язык интерфейса',
      enterWorkspace: 'Войти',
      createWorkspace: 'Создать аккаунт и workspace',
      createAccount: 'Зарегистрироваться',
      forgotPassword: 'Забыли пароль?',
      sendRecoveryLink: 'Отправить письмо для восстановления',
      openLogin: 'Перейти ко входу',
      recoveryHint: 'Используйте email, на который зарегистрирован ваш workspace.',
      passwordHint: 'Минимум 8 символов, одна заглавная буква и одна цифра.',
      sessionSecurity: 'Доступ защищён role-based guard',
      rememberMe: 'Оставаться в системе',
      rememberMeHint: 'Сохраним email на этом устройстве для следующего входа.',
      noAccount: 'Ещё нет аккаунта?',
      hasAccount: 'Уже есть аккаунт?',
      backToLoginPrompt: 'Вернуться к форме входа?',
      demoAccess: 'Демо-доступы',
      demoPassword: 'Пароль для входа: {password}',
      slider: {
        badge: 'AdFlow Console',
        slides: [
          {
            kicker: 'Unified workspace',
            title: 'Контролируйте рекламные операции из одного пространства',
            description:
              'Собирайте кампании, команды и повседневные ad ops-процессы в едином рабочем интерфейсе.',
          },
          {
            kicker: 'Scale & visibility',
            title: 'Масштабируйте каналы без потери прозрачности',
            description:
              'Следите за доступами, рабочими сценариями и производительностью кампаний, когда команд и аккаунтов становится больше.',
          },
          {
            kicker: 'Security controls',
            title: 'Держите безопасность и доступы под контролем',
            description:
              'Разделяйте роли, защищайте workspace и сокращайте риск ручных ошибок в ежедневной работе.',
          },
          {
            kicker: 'Team alignment',
            title: 'Синхронизируйте команду вокруг роста, а не рутины',
            description:
              'Планирование, согласование и execution live-кампаний должны ощущаться как единый продуктовый поток.',
          },
        ],
      },
      securityTitle: 'Auth foundation',
      securityText: 'Вход, регистрация, восстановление и role-based access уже готовы.',
      timezoneHint: 'Используется в отчётах, расписаниях и времени уведомлений.',
      roleSummary: 'Роль в системе: {role}',
      metrics: {
        securedSeats: 'Защищённых seat-ов',
        activeRules: 'Активных automation rules',
        approvalRate: 'Успешный auth rate',
      },
      securityChecklist: {
        roles: 'Role-based маршрутизация: viewer не получает доступ к screen-ам управления кампаниями.',
        recovery:
          'Сценарий восстановления валидирует email и показывает понятный результат без backend-заглушек в UI.',
        workspace:
          'Регистрация сразу собирает имя, компанию, workspace, роль, язык и часовой пояс.',
      },
      placeholders: {
        email: 'Введите email',
        password: 'Введите пароль',
        confirmPassword: 'Введите пароль ещё раз',
        fullName: 'Введите имя',
        companyName: 'Введите название компании',
        workspaceTitle: 'Введите название workspace',
      },
      languages: {
        ru: 'Русский',
        en: 'English',
      },
      errors: {
        invalidCredentials: 'Неверный email или пароль.',
        emailNotFound: 'Пользователь с таким email не найден.',
        emailTaken: 'Этот email уже используется. Попробуйте войти.',
        registerFailed: 'Не удалось создать аккаунт. Проверьте поля и повторите попытку.',
        resetFailed: 'Не удалось запустить восстановление. Попробуйте ещё раз.',
      },
      validation: {
        email: 'Введите корректный email.',
        passwordLength: 'Пароль должен содержать минимум 8 символов.',
        passwordUppercase: 'Добавьте хотя бы одну заглавную букву.',
        passwordNumber: 'Добавьте хотя бы одну цифру.',
        passwordMismatch: 'Пароли не совпадают.',
        name: 'Введите имя не короче 2 символов.',
        companyName: 'Введите название компании.',
        workspaceTitle: 'Введите название workspace.',
        timezone: 'Укажите корректный часовой пояс.',
      },
      reset: {
        success: 'Сценарий восстановления запущен.',
        dialogTitle: 'Проверьте почту',
        successDescription:
          'Если аккаунт существует, мы отправили письмо со ссылкой для восстановления на {email}.',
      },
    },
    roles: {
      admin: 'Admin',
      manager: 'Manager',
      viewer: 'Viewer',
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
        'Следите за ключевыми метриками, динамикой кампаний и рабочими приоритетами команды.',
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
        'Управляйте кампаниями, отслеживайте статус размещений и держите под рукой основные показатели.',
      create: 'Создать кампанию',
      search: 'Поиск',
      searchPlaceholder: 'Название, канал или владелец',
    },
    reports: {
      badge: 'Analytics layer',
      title: 'Отчёты и экспорт',
      subtitle:
        'Собирайте сводку по эффективности и выгружайте данные для дальнейшего анализа.',
      exportTitle: 'Экспорт отчёта',
      exportText: 'Подготовьте выгрузку данных и используйте её для командной аналитики и отчётности.',
      export: 'Экспортировать CSV',
    },
    topbar: {
      workspace: 'Основной workspace',
      search: 'Поиск',
    },
  },
  en: {
    auth: {
      eyebrow: 'AdFlow Access',
      heroTitle: 'Run advertising like a mature adtech platform',
      heroText:
        'A focused control center for teams, budgets, analytics, and campaign decisions.',
      registerHeroTitle: 'Launch a workspace for teams, roles, and campaign operations',
      registerHeroText:
        'Create a workspace for your team, access control, and everyday campaign operations.',
      recoveryHeroTitle: 'Restore access to your workspace without losing campaign context',
      recoveryHeroText:
        'The recovery flow helps your team regain access to dashboards, reports, and controls in a safe product-like way.',
      welcomeBack: 'Welcome back',
      signIn: 'Sign in to your workspace',
      signInShort: 'Sign in',
      signOut: 'Sign out',
      registerTitle: 'Create a workspace',
      registerSubtitle: 'New team setup',
      recoveryTitle: 'Password recovery',
      recoverySubtitle: 'Account access',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      fullName: 'Full name',
      companyName: 'Company',
      workspaceTitle: 'Workspace title',
      role: 'Role',
      timezone: 'Timezone',
      interfaceLanguage: 'Interface language',
      enterWorkspace: 'Enter workspace',
      createWorkspace: 'Create account and workspace',
      createAccount: 'Create account',
      forgotPassword: 'Forgot your password?',
      sendRecoveryLink: 'Send recovery email',
      openLogin: 'Go to sign in',
      recoveryHint: 'Use the email address connected to your workspace.',
      passwordHint: 'Use at least 8 characters, one uppercase letter, and one number.',
      sessionSecurity: 'Access is protected by role-based guards',
      rememberMe: 'Stay signed in',
      rememberMeHint: 'We will keep your email on this device for the next sign-in.',
      noAccount: 'Do not have an account yet?',
      hasAccount: 'Already have an account?',
      backToLoginPrompt: 'Return to the sign-in form?',
      demoAccess: 'Demo access',
      demoPassword: 'Demo password: {password}',
      slider: {
        badge: 'AdFlow Console',
        slides: [
          {
            kicker: 'Unified workspace',
            title: 'Run ad operations from one unified workspace',
            description:
              'Bring campaigns, teams, and daily ad ops workflows into a single product environment.',
          },
          {
            kicker: 'Scale & visibility',
            title: 'Scale channels without losing visibility',
            description:
              'Track access, operational flows, and campaign performance as your accounts and teams grow.',
          },
          {
            kicker: 'Security controls',
            title: 'Keep security and permissions under control',
            description:
              'Separate roles, protect the workspace, and reduce the cost of manual mistakes in everyday execution.',
          },
          {
            kicker: 'Team alignment',
            title: 'Align the team around growth, not routine',
            description:
              'Planning, approvals, and live campaign execution should feel like one cohesive product flow.',
          },
        ],
      },
      securityTitle: 'Auth foundation',
      securityText: 'Sign in, registration, recovery, and role-based access are all wired in.',
      timezoneHint: 'Used for reports, schedules, and notification timing.',
      roleSummary: 'Current system role: {role}',
      metrics: {
        securedSeats: 'Secured seats',
        activeRules: 'Active automation rules',
        approvalRate: 'Successful auth rate',
      },
      securityChecklist: {
        roles: 'Role-based routing keeps viewers away from campaign-management screens.',
        recovery:
          'The recovery flow validates the email and returns a clean product-state without backend scaffolding leaking into the UI.',
        workspace:
          'Registration captures name, company, workspace, role, language, and timezone from the start.',
      },
      placeholders: {
        email: 'Enter email',
        password: 'Enter password',
        confirmPassword: 'Enter password again',
        fullName: 'Enter your name',
        companyName: 'Enter company name',
        workspaceTitle: 'Enter workspace title',
      },
      languages: {
        ru: 'Russian',
        en: 'English',
      },
      errors: {
        invalidCredentials: 'Incorrect email or password.',
        emailNotFound: 'No user with this email was found.',
        emailTaken: 'This email is already in use. Try signing in instead.',
        registerFailed: 'We could not create the account. Please review the form and try again.',
        resetFailed: 'We could not start the recovery flow. Please try again.',
      },
      validation: {
        email: 'Enter a valid email address.',
        passwordLength: 'Password must include at least 8 characters.',
        passwordUppercase: 'Add at least one uppercase letter.',
        passwordNumber: 'Add at least one number.',
        passwordMismatch: 'Passwords do not match.',
        name: 'Enter a name with at least 2 characters.',
        companyName: 'Enter a company name.',
        workspaceTitle: 'Enter a workspace title.',
        timezone: 'Enter a valid timezone.',
      },
      reset: {
        success: 'Recovery flow initiated.',
        dialogTitle: 'Check your inbox',
        successDescription:
          'If the account exists, we sent a recovery link to {email}.',
      },
    },
    roles: {
      admin: 'Admin',
      manager: 'Manager',
      viewer: 'Viewer',
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
        'Track key metrics, campaign movement, and the team’s current priorities in one place.',
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
        'Manage campaigns, monitor delivery status, and keep core performance signals close at hand.',
      create: 'Create campaign',
      search: 'Search',
      searchPlaceholder: 'Name, channel, or owner',
    },
    reports: {
      badge: 'Analytics layer',
      title: 'Reports and export',
      subtitle:
        'Review performance summaries and prepare exports for further analysis and reporting.',
      exportTitle: 'Report export',
      exportText:
        'Prepare a data export for team reporting, operational reviews, and deeper analysis.',
      export: 'Export CSV',
    },
    topbar: {
      workspace: 'Primary workspace',
      search: 'Search',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale === 'en' ? 'en' : 'ru',
  fallbackLocale: 'en',
  messages,
})
