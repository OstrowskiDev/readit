import Quill from 'quill'

const Inline = Quill.import('blots/inline')

class SpoilerBlot extends Inline {
  static blotName = 'spoiler'
  static tagName = 'spoiler'
  static className = 'ql-spoiler'
}

Quill.register(SpoilerBlot)
