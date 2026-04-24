import type { User, UserRole } from '@/entities/user/model/types'
import type {
  LoginPayload,
  PasswordResetPayload,
  RegisterPayload,
} from '@/features/auth/model/types'

interface MockAuthUser extends User {
  password: string
  companyName: string
  workspaceTitle: string
}

const USERS_STORAGE_KEY = 'adflow-auth-users'
const DEFAULT_PASSWORD = 'AdFlow123!'

const seedUsers: MockAuthUser[] = [
  {
    id: 'usr-001',
    name: 'Margarita Sergeeva',
    email: 'margarita@adflow.test',
    password: DEFAULT_PASSWORD,
    role: 'admin',
    locale: 'ru',
    timezone: 'Europe/Moscow',
    companyName: 'AdFlow Labs',
    workspaceTitle: 'AdFlow Core',
  },
  {
    id: 'usr-002',
    name: 'Alex Mercer',
    email: 'manager@adflow.test',
    password: DEFAULT_PASSWORD,
    role: 'manager',
    locale: 'en',
    timezone: 'Europe/London',
    companyName: 'North Axis Media',
    workspaceTitle: 'North Axis Growth',
  },
  {
    id: 'usr-003',
    name: 'Emily Wren',
    email: 'viewer@adflow.test',
    password: DEFAULT_PASSWORD,
    role: 'viewer',
    locale: 'en',
    timezone: 'America/New_York',
    companyName: 'BlueRiver Ads',
    workspaceTitle: 'BlueRiver Performance',
  },
]

function isClient() {
  return typeof window !== 'undefined'
}

function readUsers() {
  if (!isClient()) return seedUsers

  const savedUsers = window.localStorage.getItem(USERS_STORAGE_KEY)

  if (!savedUsers) {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }

  try {
    return JSON.parse(savedUsers) as MockAuthUser[]
  } catch {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }
}

function writeUsers(users: MockAuthUser[]) {
  if (!isClient()) return

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function sanitizeUser(user: MockAuthUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    locale: user.locale,
    timezone: user.timezone,
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function createUserId() {
  return `usr-${Date.now().toString(36)}`
}

export function getMockAuthUsers() {
  return readUsers()
}

export function authenticateUser(payload: LoginPayload) {
  const user = readUsers().find((entry) => normalizeEmail(entry.email) === normalizeEmail(payload.email))

  if (!user) {
    return {
      ok: false,
      message: 'auth.errors.emailNotFound',
    }
  }

  if (user.password !== payload.password) {
    return {
      ok: false,
      message: 'auth.errors.invalidCredentials',
    }
  }

  return {
    ok: true,
    user: sanitizeUser(user),
  }
}

export function registerUser(payload: RegisterPayload) {
  const users = readUsers()
  const email = normalizeEmail(payload.email)

  if (users.some((entry) => normalizeEmail(entry.email) === email)) {
    return {
      ok: false,
      message: 'auth.errors.emailTaken',
    }
  }

  const nextUser: MockAuthUser = {
    id: createUserId(),
    name: payload.name.trim(),
    email,
    password: payload.password,
    role: 'manager',
    locale: isClient() && window.localStorage.getItem('adflow-locale') === 'en' ? 'en' : 'ru',
    timezone: 'Europe/Moscow',
    companyName: payload.companyName.trim(),
    workspaceTitle: payload.workspaceTitle.trim(),
  }

  const nextUsers = [...users, nextUser]
  writeUsers(nextUsers)

  return {
    ok: true,
    user: sanitizeUser(nextUser),
  }
}

export function requestPasswordReset(payload: PasswordResetPayload) {
  const email = normalizeEmail(payload.email)
  const user = readUsers().find((entry) => normalizeEmail(entry.email) === email)

  if (!user) {
    return {
      ok: false,
      message: 'auth.errors.emailNotFound',
    }
  }

  return {
    ok: true,
    message: 'auth.reset.success',
  }
}

export function getRoleLabel(role: UserRole) {
  return `roles.${role}`
}

export const authDemoCredentials = seedUsers.map((user) => ({
  role: user.role,
  email: user.email,
  password: user.password,
  name: user.name,
}))
