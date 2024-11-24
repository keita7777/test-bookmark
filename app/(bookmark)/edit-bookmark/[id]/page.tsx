// ブックマーク編集画面
// ブックマークIDをパラメータで受け取る

export default function EditBookmarkPage({ params }: { params: { id: string } }) {
  return <div>ブックマーク編集フォーム{params.id}</div>;
}
