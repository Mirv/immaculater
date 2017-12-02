"""Utilities used across multiple modules."""

def Indented(txt, num_indents=1, num_spaces=4):
  """Returns txt indented across multiple lines.

  Args:
    txt: basestring
    num_indents: int
    num_spaces: int
  Returns:
    basestring
  """
  if not txt.strip():
    return ''
  lines = txt.splitlines()
  indent = ' ' * num_spaces * num_indents
  return '\n'.join(indent + line for line in lines)
