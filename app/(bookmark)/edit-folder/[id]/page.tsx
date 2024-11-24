// フォルダー編集画面
// フォルダーIDをパラメータで受け取る

export default function EditFolderPage({ params }: { params: { id: string } }) {
  return <div>フォルダー編集フォーム{params.id}</div>;
}
