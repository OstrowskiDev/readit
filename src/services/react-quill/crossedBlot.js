import Quill from 'quill'

const Inline = Quill.import('blots/inline')

class CrossedBlot extends Inline {
  static blotName = 'crossed'
  static tagName = 'del'
}

Quill.register(CrossedBlot)
