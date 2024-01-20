import "./style.scss"
import Editor from '@monaco-editor/react';
const EditCode = (props: any) => {
  const { value, onChange, type } = props
  return (
    <>
      {/* <h1>tests</h1> */}
      <Editor 
      // onMount={(editor:any, monaco) => {
      //   setTimeout(function () {
      //     editor.getAction('editor.action.formatDocument').run();
      //   }, 10);
      // }}
      {...props}
        height="500px" defaultLanguage={type} defaultValue={value}/>
    </>
  )
}
export default EditCode