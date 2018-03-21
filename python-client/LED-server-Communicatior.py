import asyncio
import json
import random
from time import sleep

import websockets


class TaskQueue():

    def __init__(self, host, width, height, main):
        if (height % 3 != 0 or width % 3 != 0):
            raise Exception("Wrong dimensions. both width and height must be dividable by three")

        self.host = host
        self.width = width
        self.height = height

        self.loop = asyncio.get_event_loop()
        self.queue = asyncio.Queue(loop=self.loop)
        self.loop.run_until_complete(asyncio.gather(self.send(), main(self)))
        self.websocket = websockets.connect(self.host)


    async def send(self):
        task = await self.queue.get()
        print("Got message!")
        await self.websocket.send(json.dumps(task))
        print("Message sendt!")

    def _slice_overhead(self, li: list):
        """
        Cuts away extra overhead to create the correct frame as 5 arrays:
        top, first, second, third, fourth
        """

        def cut(startX, startY, stopX, stopY):
            return [[li[y][x] for x in range(startX, stopX)] for y in range(startY, stopY)]

        th = int(len(li) / 3)
        tw = int(len(li[0]) / 3)
        return {
            'first':  cut(tw * 1, th * 0, tw * 2, tw * 1),
            'second': cut(tw * 2, th * 1, tw * 3, tw * 2),
            'third':  cut(tw * 1, th * 2, tw * 2, tw * 3),
            'fourth': cut(tw * 0, th * 1, tw * 1, tw * 2),
            'top':    cut(tw * 1, th * 1, tw * 2, tw * 2)
        }

    def __iadd__(self, other):
        # Format to minimize overhead
        # other = self._slice_overhead(other)
        self.queue.put(other)
        return self


def funkyColor(x, y, width, height):
    return '#%02x%02x%02x' % (int(x / width), int(y / height), 150)

def random_frame(width, height):
    frame = []
    for y in range(height):
        frame += [[]]
        for x in range(width):
            frame[y] += [funkyColor(x, y, width, height) if random.randint(0, 1) == 1 else "#FFFFFF"]
    return frame


async def production(queue):
    i = 0
    while i < 1000:
        queue += random_frame(queue.width, queue.height)
        i += 1

if __name__ == '__main__':
    queue = TaskQueue(host="ws://localhost:3000/", width=30, height=30, main=production)
    queue.loop.close()