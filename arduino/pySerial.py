# This is for serial communication via uart with an arduino
# python3

import serial
import time
import sys
import binascii

BAUDRATE = 1000000 # Baud rate, match with Arduino sketch
NO_LEDS = 60      # Number of LEDs in the string

# Initialize serial communication, 8 data bits, no parity 1 stop bit, REMEMBER to set correct COM port
ser = serial.Serial('COM3', BAUDRATE, serial.EIGHTBITS, serial.PARITY_NONE, serial.STOPBITS_ONE)
time.sleep(5) # Some wait time for initializing com port

def serialWrite(data):
    ser.write(data)

# Read a number of bytes
def serialRead(bytes):
    return ser.read(bytes)

# LED string init values and arrray
r, g, b = 0, 0 ,0
LED_values = bytearray([r,g,b]*NO_LEDS)

def main():  # This is just a testing function
    while(True):
        serialWrite(LED_values)
        for x in range(0, NO_LEDS*3):
            LED_values[x] += 5
            if LED_values[x] == 255:
                LED_values[x] = 0
        
        print("LED-array: ", binascii.hexlify(LED_values)) # Convert the bytearray to hex for printing

if __name__ == '__main__':
    main()
