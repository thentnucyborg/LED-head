import numpy as np

class LEDVisualizer():

    shape = (36, 46)


    def __init__(self):
        self._content = np.array([])

    def __iadd__(self, other):
        if isinstance(other, list):
            other = np.array(other)
        elif isinstance(other, np.array):
            pass
        else:
            raise TypeError("Wrong type! Must be list or np.array with shape=%s" % str(self.shape))

        if other.shape != self.shape:
            raise IndexError('Wrong shape. Shape must be %s' % str(self.shape))

    def __getitem__(self, item):
        