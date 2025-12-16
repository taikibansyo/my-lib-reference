export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let value = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    if (char === '"') {
      const nextChar = text[i + 1]
      if (inQuotes && nextChar === '"') {
        value += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === "," && !inQuotes) {
      row.push(value)
      value = ""
      continue
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && text[i + 1] === "\n") {
        i += 1
      }
      row.push(value)
      rows.push(row)
      row = []
      value = ""
      continue
    }

    value += char
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value)
    rows.push(row)
  }

  return rows.filter((currentRow) =>
    currentRow.some((cell) => cell.trim().length > 0),
  )
}
