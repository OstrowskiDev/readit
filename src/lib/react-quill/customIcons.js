import { boldIco } from '@/app/ui/icons-strings/boldIco'
import { clearIco } from '@/app/ui/icons-strings/clearIco'
import { codeIco } from '@/app/ui/icons-strings/codeIco'
import { headerIco } from '@/app/ui/icons-strings/headerIco'
import { italicIco } from '@/app/ui/icons-strings/italicIco'
import { linkIco } from '@/app/ui/icons-strings/linkIco'
import { orderedListIco } from '@/app/ui/icons-strings/orderedListIco'
import { strikeIco } from '@/app/ui/icons-strings/strikeIco'
import { supIco } from '@/app/ui/icons-strings/supIco'
import { unorderedListIco } from '@/app/ui/icons-strings/unorderedListIco'
import Quill from 'quill'

const icons = Quill.import('ui/icons')

icons.bold = boldIco
icons.italic = italicIco
icons.strike = strikeIco
icons.script = { super: supIco }
icons.header = headerIco

icons.list = { ordered: orderedListIco, bullet: unorderedListIco }

icons.link = linkIco
icons.code = codeIco
icons.clean = clearIco
