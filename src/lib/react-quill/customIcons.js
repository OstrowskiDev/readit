import { boldIco } from '@/ui/icons-strings/boldIco'
import { clearIco } from '@/ui/icons-strings/clearIco'
import { codeIco } from '@/ui/icons-strings/codeIco'
import { headerIco } from '@/ui/icons-strings/headerIco'
import { italicIco } from '@/ui/icons-strings/italicIco'
import { linkIco } from '@/ui/icons-strings/linkIco'
import { orderedListIco } from '@/ui/icons-strings/orderedListIco'
import { strikeIco } from '@/ui/icons-strings/strikeIco'
import { supIco } from '@/ui/icons-strings/supIco'
import { unorderedListIco } from '@/ui/icons-strings/unorderedListIco'
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
