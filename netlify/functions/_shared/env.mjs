// Prefer Netlify.env inside functions. Fall back to process.env so local tests
// and the existing relay keep working when the Netlify global is absent.
export function readEnvValue(name) {
  try {
    if (typeof Netlify !== 'undefined' && Netlify.env && typeof Netlify.env.get === 'function') {
      const value = Netlify.env.get(name)
      if (typeof value === 'string' && value.length) return value
    }
  } catch {
    // Netlify.env exists only in the Netlify runtime.
  }
  const fallback = process.env[name]
  return typeof fallback === 'string' ? fallback : ''
}

export function readEnv(names) {
  const env = {}
  for (const name of names) env[name] = readEnvValue(name)
  return env
}
