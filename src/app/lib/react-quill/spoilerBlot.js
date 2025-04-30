import Quill from 'quill'

const Inline = Quill.import('blots/inline')

class SpoilerBlot extends Inline {
  static blotName = 'spoiler'
  static tagName = 'mark'
  static className = 'spoiler'
}

Quill.register(SpoilerBlot)
