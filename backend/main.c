#include <Arduino.h>
//#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <FreeRTOS.h>
#include <Wire.h>
#include <Adafruit_ADS1X15.h>

Adafruit_ADS1115 ads;


const char *SSID = "Wifi_SSID";
const char *PWD = "Wifi_PASSWORD";

float read0, read1, read2;

WebServer server(80);

StaticJsonDocument<128> jsonDocument;
char buffer[128];

 
void connectToWiFi() {
  Serial.print("Connecting to ");
  Serial.println(SSID);
  
  WiFi.begin(SSID, PWD);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(250);
  }
 
  Serial.print("Connected. IP: ");
  Serial.println(WiFi.localIP());
}


void read_sensor_data(void * parameter) {
  for (;;) {
    Serial.println("Read Data");
//    read0 = ads.readADC_SingleEnded(0);
//    read1 = ads.readADC_SingleEnded(1);
//    read2 = ads.readADC_SingleEnded(2);
      read0 = analogRead(GPIO_NUM_39);
      read1 = analogRead(GPIO_NUM_36);
      read2 = analogRead(GPIO_NUM_34);
      vTaskDelay(250 / portTICK_PERIOD_MS);
   }
}

void getData() {
  jsonDocument.clear();
  jsonDocument.add(read0);
  jsonDocument.add(read1);
  jsonDocument.add(read2);
  
  serializeJson(jsonDocument, buffer);
  
  server.send(200, "application/json", buffer);
}

void setup_routing() { 
  server.on("/var", getData);  
  server.begin();
  server.enableCORS();  
}

void setup_task() {    
  xTaskCreate(     
  read_sensor_data,      
  "Read sensor data",      
  1400,      
  NULL,      
  1,     
  NULL     
  );
}

void setup() {
  Serial.begin(9600);
    if (!ads.begin()) {
    Serial.println("Failed to initialize ADS.");
    while (1);
  }

  ads.setGain(GAIN_ONE);        // 1x gain   +/- 4.096V  1 bit = 2mV      0.125mV
  Wire.begin();
  //ads.begin();
  connectToWiFi();     
  setup_task();    
  setup_routing();
}    
       
void loop() {    
  server.handleClient(); 
}
