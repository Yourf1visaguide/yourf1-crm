
function Heading({text}:{text:string}) {
  return (
    <>
    <h2 className="text-center text-2xl font-semibold">{text}</h2>
    <p className="text-sm text-muted-foreground  pt-2 text-center">"Manage employees, roles, schedules and access."</p>
    </>
  )
}

export default Heading