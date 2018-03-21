from __future__ import print_function
import string
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import numpy as np

MAC_FONTS = "/System/Library/Fonts/"
LINUX_FONTS = "/usr/share/fonts/"

def char_to_pixels(text, font, w, h):
    """
    Based on https://stackoverflow.com/a/27753869/190597 (jsheperd)
    """
    image = Image.new('L', (w, h), 1)
    draw = ImageDraw.Draw(image)
    draw.text((0, 0), text, font=font)
    arr = np.asarray(image)
    arr = np.where(arr, 0, 1)
    arr = arr[(arr != 0).any(axis=1)]
    return arr

def letter(arr):
    result = np.where(arr, '#', ' ')
    return '\n'.join([''.join(row) for row in result])

def sentence(arrs, letter_spaces=3, space_size=10, w=7, h=6):
    sentence = []
    for x, arr in enumerate(arrs):
        result = np.where(arr, '#', ' ')
        if result.size == 0:
            for i in range(h):
                sentence[i] += ' '*space_size


        else:
            if len(result) < h:
                for _ in range(h - len(result)):
                    result = [" "*w] + result

            for i, row in enumerate(result):
                if x == 0:
                    sentence += [""]

                sentence[i] += ''.join(row)
                sentence[i] += ' '*letter_spaces


    return sentence


def textMatrix(text):

    font = ImageFont.truetype(MAC_FONTS + "/Avenir.ttc", 15)
    w, h = font.getsize("A")
    h *= 2

    A = char_to_pixels("A".upper(), font, w, h)

    arrs = []
    to_print = text
    to_print = to_print.strip().upper()
    for c in to_print:
        arrs += [char_to_pixels(c.upper(), font, w, h)]

    return "\n".join(sentence(arrs, 3, 10, *A.shape))
