import type { NextConfig } from 'next'
import path from 'path'

// The concrete site's package-lock.json sits above this app. Without an
// explicit root, Next.js treats the repo as the workspace and compiles the
// concrete site's middleware into this build.
const root = path.join(__dirname)

const nextConfig: NextConfig = {
  output: 'export',
  outputFileTracingRoot: root,
  turbopack: {
    root,
  },
}

export default nextConfig
