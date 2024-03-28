export default function CreateBtn({ isCreateFormVis, setIsCreateFormVis }) {
  function onClick() {
    setIsCreateFormVis(!isCreateFormVis)
  }
  return (
    <button className="btn-blue h-10 px-4 py-2 md:ml-2" onClick={onClick}>
      Create +
    </button>
  )
}
