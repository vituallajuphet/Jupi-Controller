#include <WiFi.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>

const char *ssid = "Petchelle-Wifi-4g";
const char *password = "Petchelle14_2016";

const int ledPin1 = 12;
const int ledPin2 = 14;
const int ledPin3 = 25;
const int ledPin4 = 26;

JsonDocument doc;
String json;

AsyncWebServer server(80);

IPAddress local_IP(192, 168, 1, 199);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);   // optional
IPAddress secondaryDNS(8, 8, 4, 4); // optional

void setup()
{
    pinMode(ledPin1, OUTPUT);
    pinMode(ledPin2, OUTPUT);
    pinMode(ledPin3, OUTPUT);
    pinMode(ledPin4, OUTPUT);

    digitalWrite(ledPin1, LOW);
    digitalWrite(ledPin2, LOW);
    digitalWrite(ledPin3, LOW);
    digitalWrite(ledPin4, LOW);

    Serial.begin(115200);
    delay(500);

    if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS))
    {
        Serial.println("STA Failed to configure");
    }

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    init_routes();
}

void init_routes()
{
    server.on("/light-1-on", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin1, HIGH);
      doc["light_no"] = "1";
      doc["pin_status"] = "on";
      doc["pin_no"] = "12";
      createJsonResponse(request); });

    server.on("/light-1-off", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin1, LOW);
      doc["light_no"] = "1";
      doc["pin_status"] = "off";
      doc["pin_no"] = "12";
      createJsonResponse(request); });

    server.on("/light-2-on", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin2, HIGH);
      doc["light_no"] = "2";
      doc["pin_no"] = "13";
      doc["pin_status"] = "on";
      createJsonResponse(request); });

    server.on("/light-2-off", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin2, LOW);
      doc["light_no"] = "2";
      doc["pin_no"] = "13";
      doc["pin_status"] = "off";
      createJsonResponse(request); });

    server.on("/light-3-on", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin3, HIGH);
      doc["light_no"] = "3";
      doc["pin_no"] = "14";
      doc["pin_status"] = "on";
      createJsonResponse(request); });

    server.on("/light-3-off", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin3, LOW);
      doc["light_no"] = "3";
      doc["pin_no"] = "14";
      doc["pin_status"] = "off";
      createJsonResponse(request); });

    server.on("/light-4-on", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin4, HIGH);
      doc["light_no"] = "4";
      doc["pin_no"] = "16";
      doc["pin_status"] = "on";
      createJsonResponse(request); });

    server.on("/light-4-off", HTTP_GET, [](AsyncWebServerRequest *request)
              {
      digitalWrite(ledPin4, LOW);
      doc["light_no"] = "4";
      doc["pin_no"] = "16";
      doc["pin_status"] = "off";
      createJsonResponse(request); });

    server.begin();
}

void createJsonResponse(AsyncWebServerRequest *request)
{
    serializeJson(doc, json);
    request->send(200, "application/json", json);
}

void loop()
{
}