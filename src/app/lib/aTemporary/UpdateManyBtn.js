import { Post } from '@/app/ui/Post'
import { addDateToOne } from './actionsTemp'

export function UpdateManyBtn(postId) {
  return <button onClick={() => addDateToOne(postId)}>Add Date</button>
}
