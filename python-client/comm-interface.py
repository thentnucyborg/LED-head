#!/usr/bin/env python

import asyncio
import json
import random

import time
import websockets


def funkyColor(x, y, width, height):
    return '#%02x%02x%02x' % (int(x / width * 255), int(y / height * 255), 150)

def random_frame(width, height):
    frame = []
    for y in range(height):
        frame += [[]]
        for x in range(width):
            frame[y] += [funkyColor(x, y, width, height) if random.randint(0, 1) == 1 else "#FFFFFF"]
    return frame

def slice_overhead(li: list):
    """
    Cuts away extra overhead to create the correct frame as 5 arrays:
    top, first, second, third, fourth
    """
    def cut(startX, startY, stopX, stopY):
        return [[ li[y][x] for x in range(startX, stopX) ] for y in range(startY, stopY)]

    th = int(len(li) / 3)
    tw = int(len(li[0]) / 3)
    return {
        'first':  cut(tw*1, th*0, tw*2, th*1),
        'second': cut(tw*2, th*1, tw*3, th*2),
        'third':  cut(tw*1, th*2, tw*2, th*3),
        'fourth': cut(tw*0, th*1, tw*1, th*2),
        'top':    cut(tw*1, th*1, tw*2, th*2)
    }

def sides_to_matrix(li, width, height):
    th = int(height / 3)
    tw = int(width  / 3)

    mapping = {
        'first': (tw * 1, th * 0, tw * 2, tw * 1),
        'second': (tw * 2, th * 1, tw * 3, tw * 2),
        'third': (tw * 1, th * 2, tw * 2, tw * 3),
        'fourth': (tw * 0, th * 1, tw * 1, tw * 2),
        'top': (tw * 1, th * 1, tw * 2, tw * 2)
    }

    def inside(x, y):
        for side, coords in mapping.items():
            x1, y1, x2, y2 = coords
            if x1 <= x < x2 and y1 <= y < y2:
                return side, x-x1, y-y1

        return "", -1 , -1

    frame = []
    for y in range(height):
        frame += [[]]
        for x in range(width):
            side, xx, yy = inside(x, y)
            frame[y] += [li[side][yy][xx]] if side else ["#FFFFFF"]
    return frame



def shift_frame(width, height, frame):
    def next_side(side):
        if   side == 'first':  return 'second'
        elif side == 'second': return 'third'
        elif side == 'third':  return 'fourth'
        elif side == 'fourth': return 'first'
        else:                  return ""

    formatted = slice_overhead(frame)
    for sidename, side in formatted.items():
        if sidename == "top": continue

        for y in range(len(side)):
            for x in range(1, len(side[y])):
                side[y][x-1] = side[y][x]

            # Wrap around:
            nextside = formatted[next_side(sidename)]
            side[y][len(side[0])-1] = nextside[0][y] # Transposed...


    return sides_to_matrix(formatted, width, height)

def send_frame(js: list):


    async def communicate(uri:str, message:dict):
        async with websockets.connect(uri) as websocket:
            await websocket.send(json.dumps(message))


    formatted = slice_overhead(js)

    asyncio.get_event_loop().run_until_complete(communicate('ws://localhost:3000/', js))


height, width = 4*3, 4*3

frame = random_frame(width, height)
while True:
    frame = shift_frame(width, height, frame)
    send_frame(frame)
    time.sleep(0.1)
