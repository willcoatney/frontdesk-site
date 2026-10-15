// Small CSV reader for the two import shapes. Handles quotes, commas, and newlines.
export function parseCsv(text) {
  const src = String(text ?? '').replace(/^\uFEFF/, '')
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < src.length; i++) {
    const char = src[i]
    if (inQuotes) {
      if (char === '"') {
        if (src[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
      continue
    }
    if (char === '"') {
      inQuotes = true
      continue
    }
    if (char === ',') {
      row.push(field)
      field = ''
      continue
    }
    if (char === '\n' || char === '\r') {
      if (char === '\r' && src[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.some((cell) => cell.trim() !== '')) rows.push(row)
      row = []
      continue
    }
    field += char
  }
  if (field.length || row.length) {
    row.push(field)
    if (row.some((cell) => cell.trim() !== '')) rows.push(row)
  }
  if (!rows.length) return { headers: [], rows: [] }
  const headers = rows[0].map((header) => header.trim().toLowerCase())
  const records = rows.slice(1).map((cells) => {
    const record = {}
    headers.forEach((header, index) => {
      if (!header) return
      record[header] = (cells[index] ?? '').trim()
    })
    return record
  })
  return { headers, rows: records }
}

export function classifyCsv(headers) {
  const names = new Set(headers)
  if (!names.has('business_name')) return 'unknown'
  const emailFile =
    names.has('email') && !names.has('trade') && !names.has('phone') && !names.has('website') && !names.has('gaps')
  return emailFile ? 'emails' : 'prospects'
}
