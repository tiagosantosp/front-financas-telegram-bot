export function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return '-'
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
  return formatter.format(Number(value))
}
