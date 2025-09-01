

function ContentHeaders({
  title,
  value,
  italicText
}: {
  title: string,
  value: string,
  italicText?: string
}) {
  return (
    <div className="flex justify-between">
        <p className="text-slate-500 dark:text-slate-300 text-sm">{title} <span className="italic">{italicText}</span></p>
        <h3 className="text-shadow-slate-900 text-sm font-bold">{value}</h3>
    </div>
  )
}

export default ContentHeaders