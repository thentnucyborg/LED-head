void meteorRain(byte red, byte green, byte blue, byte meteorSize, byte meteorTrailDecay, boolean meteorRandomDecay, int SpeedDelay);
void fadeToBlack(int ledNo, byte fadeValue);
void setAll(byte red, byte green, byte blue);
void setPixel(int Pixel, byte red, byte green, byte blue);
/*
  https://playground.arduino.cc/Interfacing/Python
  Using FastLED library:
  - Download the FastLED library: http://fastled.io/ as .zip.
  - In Arduino IDE: Sketch -> Include library -> Add .ZIP library
*/
#include <FastLED.h>
#define NUM_LEDS 791
#define DATA_PIN 6
#define BAUDRATE 115200

// BUFFER AND VARIABLES FOR RECEIVING A BYTEARRAY
uint8_t buffer[NUM_LEDS*3];   // Each led has 3 bytes of data (One for each color value)
int numBytesRead = 0;   // How many bytes have we read into the buffer
int color = 1;
bool gotData = false;   // Got all data we needed to set leds

// INITIALIZE LEDS
CRGB leds[NUM_LEDS];

// SETUP LEDS AND SERIAL COMMUINICATION
void setup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  // FastLED.setBrightness(255);
  // FastLED.setMaxPowerInVoltsAndMilliamps(5, 10000);
  FastLED.clear();
  FastLED.show();
  // meteorRain(0xff,0xff,0xff,10, 64, true, 30);
  Serial.begin(BAUDRATE, SERIAL_8N1);     //Starting serial communication, 8 data bits, no parity, 1 stop bit
}

void loop(){
  if (gotData) {
    FastLED.show(); 
    gotData = false;
  }
}


/* SERIAL
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. Multiple bytes of data may be available.
  https://www.arduino.cc/en/Reference/SerialEvent
  https://www.arduino.cc/en/Tutorial/SerialEvent
*/

// Handle incoming serial data from PC, Pioneer LX or Raspberry Pi
void serialEvent(){
  
  while(Serial.available() && !gotData) {
    int color = numBytesRead % 3;
    buffer[color] = Serial.read();
    
    if (color == 2) {
      leds[numBytesRead/3].r = buffer[0];
      leds[numBytesRead/3].g = buffer[1];
      leds[numBytesRead/3].b = buffer[2];
    }
    
    numBytesRead++;
    
    if(numBytesRead == NUM_LEDS*3){
      gotData = true;
      numBytesRead = 0;
    }
  }
}


// ANIMATION

//Function for setting a specific LED
void setPixel(int Pixel, byte red, byte green, byte blue) {
   leds[Pixel].r = red;
   leds[Pixel].g = green;
   leds[Pixel].b = blue;
}
//Function for setting all LEDs
void setAll(byte red, byte green, byte blue) {
  for(int i = 0; i < NUM_LEDS; i++ ) {
    setPixel(i, red, green, blue); 
  }
  FastLED.show();
}

void fadeToBlack(int ledNo, byte fadeValue) {
   leds[ledNo].fadeToBlackBy( fadeValue );
}

void meteorRain(byte red, byte green, byte blue, byte meteorSize, byte meteorTrailDecay, boolean meteorRandomDecay, int SpeedDelay) {  
  setAll(0,0,0);
  
  for(int i = 0; i < NUM_LEDS+NUM_LEDS; i++) {
    
    
    // fade brightness all LEDs one step
    for(int j=0; j<NUM_LEDS; j++) {
      if( (!meteorRandomDecay) || (random(10)>5) ) {
        fadeToBlack(j, meteorTrailDecay );        
      }
    }
    
    // draw meteor
    for(int j = 0; j < meteorSize; j++) {
      if( ( i-j <NUM_LEDS) && (i-j>=0) ) {
        setPixel(i-j, red, green, blue);
      } 
    }
   
    FastLED.show();
    delay(SpeedDelay);
  }
}