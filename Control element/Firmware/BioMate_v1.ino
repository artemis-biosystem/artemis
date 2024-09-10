#include <Arduino.h>
#include <WiFi.h>
#include "HX711.h"
#include <FS.h>
#include <LittleFS.h>
#include <map>
#include <string>
#include <ArduinoJson.h>
#include <AccelStepper.h>
#include <ESP32Servo.h>

unsigned long currentMillis;
bool resetFile;
String ConfigFileName = "/config.json";
String defaultJson = "{"
                     "\"PistonPump1\":{"
                     "\"enable\":0,"
                     "\"time_on\":3000,"
                     "\"time_off\":3000,"
                     "\"threshold\":15,"
                     "\"speed\":5000,"
                     "\"max_step\":4500"
                     "},"
                     "\"PistonPump2\":{"
                     "\"enable\":0,"
                     "\"time_on\":1000,"
                     "\"time_off\":1000,"
                     "\"threshold\":15,"
                     "\"speed\":5000"
                     "},"
                     "\"AirPump1\":{"
                     "\"enable\":0,"
                     "\"time_on\":1000,"
                     "\"time_off\":1000,"
                     "\"intensity\":50"
                     "},"
                     "\"AirPump2\":{"
                     "\"enable\":0,"
                     "\"time_on\":1000,"
                     "\"time_off\":1000,"
                     "\"intensity\":50"
                     "},"
                     "\"PeristalticPump1\":{"
                     "\"enable\":0,"
                     "\"time_on\":2000,"
                     "\"time_off\":2000,"
                     "\"speed\":60,"
                     "\"direction\":0"
                     "},"
                     "\"PeristalticPump2\":{"
                     "\"enable\":0,"
                     "\"time_on\":2000,"
                     "\"time_off\":2000,"
                     "\"speed\":60,"
                     "\"direction\":0"
                     "},"
                     "\"Valve1\":{"
                     "\"enable\":0,"
                     "\"angle\":90"
                     "},"
                     "\"LED1\":{"
                     "\"enable\":0,"
                     "\"time_on\":2000,"
                     "\"time_off\":2000,"
                     "\"intensity\":50"
                     "}"

                     "}";

enum ModuleState {
  IDLE,
  RUNNING,
  CALIBRATING
};
////////////////////////////////////////////
//////////////AIRPUMP//////////////////////
//////////////////////////////////////////

class AirPump {
private:
  bool enabled;
  int in1_pin;
  int in2_pin;
  int en_pin;
  int intensity;
  int pwmChannel;

public:
  int time_on;
  int time_off;
  bool isOn;
  unsigned long lastToggle;
  ModuleState state;

  // Constructor
  AirPump(bool en, int in1, int in2, int enp, int on, int off, int inten, int pwm)
    : enabled(en), in1_pin(in1), in2_pin(in2), en_pin(enp), time_on(on), time_off(off), intensity(map(inten, 0, 100, 0, 255)), pwmChannel(pwm) {
    if (enabled) {
      pinMode(in1_pin, OUTPUT);
      pinMode(in2_pin, OUTPUT);
      pinMode(en_pin, OUTPUT);
      ledcSetup(pwmChannel, 3000, 8);
      ledcAttachPin(en_pin, pwmChannel);
      ledcWrite(pwmChannel, intensity);  // Apply the initial intensity
      Serial.println("AirPump initialized with intensity: " + String(intensity));
    }
    else{
      pinMode(in1_pin, OUTPUT);
      pinMode(in2_pin, OUTPUT);
      pinMode(en_pin, OUTPUT);
      digitalWrite(in1_pin, LOW);
      digitalWrite(in2_pin, LOW);

    }
  }

  void turnOn() {
    if (!enabled) return;  // Check if enabled before turning on
    digitalWrite(in1_pin, HIGH);
    digitalWrite(in2_pin, LOW);
    ledcWrite(pwmChannel, intensity);
    Serial.println("AirPump turned on with intensity: " + String(intensity));
  }

  void turnOff() {
    digitalWrite(in1_pin, LOW);
    digitalWrite(in2_pin, LOW);
    Serial.println("AirPump turned off");
  }

  void setEnabled(bool en) {
    enabled = en;
    if (enabled) {
      pinMode(in1_pin, OUTPUT);
      pinMode(in2_pin, OUTPUT);
      ledcSetup(pwmChannel, 3000, 8);
      ledcAttachPin(en_pin, pwmChannel);
      ledcWrite(pwmChannel, intensity);  // Apply the intensity when enabled
      Serial.println("AirPump enabled with intensity: " + String(intensity));
    } else {
      turnOff();
    }
  }

  bool isEnabled() const {
    return enabled;
  }

  void setIntensity(int inten) {
    intensity = map(inten, 0, 100, 0, 255);
    if (enabled) {
      ledcWrite(pwmChannel, intensity);  // Apply the new intensity
      Serial.println("AirPump intensity set to: " + String(intensity));
    }
  }

  int getIntensity() const {
    return intensity;
  }
};

////////////////////////////////////////////
//////////////#AIRPUMP/////////////////////
//////////////////////////////////////////

////////////////////////////////////////////
//////////////PISPUMP//////////////////////
//////////////////////////////////////////

class PistonPump {
private:
  bool enabled;
  float calibration_factor;
  HX711 scale;            // Each pump has its own HX711 instance
  AccelStepper* stepper;  // Store a pointer to the AccelStepper object
  int stp_pin;
  int dir_pin;
  int dout_pin;
  int clk_pin;



public:
  int time_on;
  int time_off;
  int threshold;
  int speed;
  unsigned long lastToggle;
  ModuleState state;  //TODO: SetState function that set the state and print it
  int maxStep;
  int CalibrationSteps;
  int initialBackwardSteps;
  int edge;
  int moveTarget;
  int moveCount;
  float current_weight;


  PistonPump(bool en, int stp, int dir, int dout, int clk, int on, int off, int thrshd, float spd, float calib, int mxstp)
    : enabled(en), stp_pin(stp), dir_pin(dir), dout_pin(dout), clk_pin(clk),
      time_on(on), time_off(off), threshold(thrshd), speed(spd), calibration_factor(calib), maxStep(mxstp), scale(), stepper(nullptr) {
    state = IDLE;
    lastToggle = 0;
  }

  void initialize() {
    pinMode(stp_pin, OUTPUT);
    pinMode(dir_pin, OUTPUT);
    scale.begin(dout_pin, clk_pin);
    scale.set_scale(calibration_factor);
    scale.tare();
    initialBackwardSteps = 4000;
    edge = 3000;
  }

  void setStepper(AccelStepper& stepperObj) {
    stepper = &stepperObj;
    stepper->setMaxSpeed(speed);
    stepper->setAcceleration(100000);  //Allow control by user?
  }

  float getWeight() {
    if (enabled) {
      current_weight = scale.get_units();
      Serial.println(current_weight);
      return current_weight;
    }
    return 0;
  }

  void setEnabled(bool ena) {
    enabled = ena;  //TODO: Add condition to initialize only if pump just got enabled now
    if (enabled) {
      initialize();
    }
  }

  void calibrate() {
    if (stepper) {
      Serial.println("Calibrating pump...");
      stepper->move(-initialBackwardSteps);
      while (stepper->distanceToGo() != 0) {
        stepper->run();
      }
      scale.tare();

      stepper->setCurrentPosition(0);
      stepper->setMaxSpeed(speed);
      current_weight = 0;
      bool thresholdReached = false;
      while (-current_weight < threshold) {
        stepper->move(500);
        while (stepper->distanceToGo() != 0) {
          stepper->run();
        }
        current_weight = scale.get_units();
        // current_weight += 1;
        Serial.println(current_weight);
      }
      Serial.println("Pump calibrated.");
    }
  }

  void stimuli(int reps) {
    if (stepper) {
      stepper->setMaxSpeed(speed);
      stepper->setAcceleration(100000);

      Serial.println("Starting stimuli...");
      moveCount = 0;
      while (moveCount < reps) {
        moveTarget = (moveTarget == 3000) ? maxStep : 3000;
        stepper->moveTo(moveTarget);
        while (stepper->distanceToGo() != 0) {
          stepper->run();
        }
        moveCount++;
      }
      Serial.println("Stimuli complete.");
    }
  }

  void turnOff() {
    Serial.println("Turning off pump...");
  }

  bool isEnabled() const {
    return enabled;
  }
};

////////////////////////////////////////////
//////////////#PISPUMP/////////////////////
//////////////////////////////////////////

////////////////////////////////////////////
//////////////PERIPUMP/////////////////////
//////////////////////////////////////////

class PeristalticPump {
private:
  bool enabled;
  int in1_pin;
  int in2_pin;
  int en_pin;
public:
  int time_on;
  int time_off;
  int speed;
  bool direction;
  unsigned long lastToggle;
  ModuleState state;

  PeristalticPump(bool en, int in1, int in2, int enp, int on, int off, int spd, bool dir)
    : enabled(en), in1_pin(in1), in2_pin(in2), en_pin(enp), time_on(on), time_off(off), speed(spd), direction(dir) {
    pinMode(in1_pin, OUTPUT);
    pinMode(in2_pin, OUTPUT);
    pinMode(en_pin, OUTPUT);
    digitalWrite(in1_pin, LOW);
    digitalWrite(in2_pin, LOW);
    digitalWrite(en_pin, 0);
    state = IDLE;
    lastToggle = 0;
  }

  void setEnabled(bool en) {
    enabled = en;
    if (enabled) {
      pinMode(in1_pin, OUTPUT);
      pinMode(in2_pin, OUTPUT);
    } else {
      turnOff();
    }
  }

  void turnOn() {
    analogWrite(en_pin, speed);
    digitalWrite(in1_pin, direction);
    digitalWrite(in2_pin, !direction);
  }

  void turnOff() {
    analogWrite(en_pin, 0);
    digitalWrite(in1_pin, LOW);
    digitalWrite(in2_pin, LOW);
  }

  bool isEnabled() const {
    return enabled;
  }
};

////////////////////////////////////////////
//////////////#PERIPUMP/////////////////////
//////////////////////////////////////////

////////////////////////////////////////////
//////////////VALVE/////////////////////
//////////////////////////////////////////

//pin26

class Valve {
private:
  bool enabled;
  int servo_pin;
  Servo servoMotor;
  int angle;

public:
  Valve(bool en, int pin, int ang)
    : enabled(en), servo_pin(pin), angle(ang), servoMotor() {
    if (enabled) {
      servoMotor.setPeriodHertz(50);            // Standard 50hz servo
      servoMotor.attach(servo_pin, 500, 2400);  // Attach the servo on the specified pin
      servoMotor.write(map(angle, 0, 180, 0, 180));  // Initialize the servo angle
    }
  }

  void setAngle(int ang) {
    if (enabled) {
      angle = ang;
      servoMotor.write(map(angle, 0, 180, 0, 180));
    }
  }

  void setEnabled(bool en) {
    enabled = en;
    if (enabled) {
      servoMotor.attach(servo_pin, 500, 2400);  // Attach the servo
      servoMotor.write(map(angle, 0, 180, 0, 180));
    } else {
      servoMotor.detach();  // Detach the servo if not enabled
    }
  }

  bool isEnabled() const {
    return enabled;
  }

  int getAngle() const {
    return angle;
  }
};



////////////////////////////////////////////
//////////////#VALVE/////////////////////
//////////////////////////////////////////

////////////////////////////////////////////
//////////////LED/////////////////////
//////////////////////////////////////////

//pin22

class LED {
private:
  bool enabled;
  // int in1_pin;
  // int in2_pin;
  int en_pin;
  int intensity;
  int pwmChannel;

public:
  int time_on;
  int time_off;
  bool isOn;
  unsigned long lastToggle;
  ModuleState state;

  // Constructor
  LED(bool en, int enp, int on, int off, int inten, int pwm)
    : enabled(en), en_pin(enp), time_on(on), time_off(off), intensity(map(inten, 0, 100, 0, 255)), pwmChannel(pwm) {
    if (enabled) {
      // pinMode(in1_pin, OUTPUT);
      // pinMode(in2_pin, OUTPUT);
      pinMode(en_pin, OUTPUT);
      ledcSetup(pwmChannel, 3000, 8);
      ledcAttachPin(en_pin, pwmChannel);
      ledcWrite(pwmChannel, intensity);  // Apply the initial intensity
      Serial.println("AirPump initialized with intensity: " + String(intensity));
    }
    else{
      // pinMode(in1_pin, OUTPUT);
      // pinMode(in2_pin, OUTPUT);
      pinMode(en_pin, OUTPUT);

      // digitalWrite(in1_pin, LOW);
      // digitalWrite(in2_pin, LOW);

    }
  }

  void turnOn() {
    if (!enabled) return;  // Check if enabled before turning on
    // digitalWrite(in1_pin, HIGH);
    // digitalWrite(in2_pin, LOW);
    ledcWrite(pwmChannel, intensity);
    Serial.println("LED turned on with intensity: " + String(intensity));
  }

  void turnOff() {
    // digitalWrite(in1_pin, LOW);
    // digitalWrite(in2_pin, LOW);
    ledcWrite(pwmChannel, 0);
    Serial.println("LED turned off");
  }

  void setEnabled(bool en) {
    enabled = en;
    if (enabled) {
      // pinMode(in1_pin, OUTPUT);
      // pinMode(in2_pin, OUTPUT);
      ledcSetup(pwmChannel, 3000, 8);
      ledcAttachPin(en_pin, pwmChannel);
      ledcWrite(pwmChannel, intensity);  // Apply the intensity when enabled
      Serial.println("LED enabled with intensity: " + String(intensity));
    } else {
      turnOff();
    }
  }

  bool isEnabled() const {
    return enabled;
  }

  void setIntensity(int inten) {
    intensity = map(inten, 0, 100, 0, 255);
    if (enabled) {
      ledcWrite(pwmChannel, intensity);  // Apply the new intensity
      Serial.println("AirPump intensity set to: " + String(intensity));
    }
  }

  int getIntensity() const {
    return intensity;
  }
};

////////////////////////////////////////////
//////////////#LED/////////////////////
//////////////////////////////////////////



////////////////INSTANTIATIONS///////////////////
AirPump airPump1(0, 14, 27, 12, 1000, 1000, 75, 0);
PistonPump PistonPump1(0, 4, 16, 39, 17, 10000, 5000, 15, 5000, -535, 4500);
AccelStepper stepper1(AccelStepper::DRIVER, 4, 16);
PeristalticPump Peristaltic1(0, 25, 33, 32, 5000, 5000, 50, 0);
Valve Valve1(0, 26, 90);
LED LED1(0, 22, 1000, 1000, 75, 2);


void saveJson(const String& jsonString);
void updateJson(const String& updateString);
void mergeJson(JsonObject& dest, JsonObject& src);
void printJson();
void updateParameters(const String& jsonString);
bool initializeFileSystem();
void handleConfigFile();
void eraseFile(const String& fileName);




void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;  // Ensure serial connection
  resetFile = true;
  if (initializeFileSystem()) {
    handleConfigFile();
  }
  PistonPump1.setStepper(stepper1);
  //////////Instantiate and calibrate the pump
}

void loop() {
  if (Serial.available()) {
    String updateString = Serial.readStringUntil('\n');
    Serial.println("Received update via serial:");
    Serial.println(updateString);
    updateJson(updateString);
    printJson();
    updateParameters(updateString);  // Update parameters based on received JSON
  }

  currentMillis = millis();

  if (airPump1.isEnabled()) {
    if (airPump1.state == IDLE && (currentMillis - airPump1.lastToggle) > airPump1.time_off) {
      airPump1.turnOn();
      airPump1.lastToggle = currentMillis;
      airPump1.state = RUNNING;
    } else if (airPump1.state == RUNNING && (currentMillis - airPump1.lastToggle) > airPump1.time_on) {
      airPump1.turnOff();
      airPump1.lastToggle = currentMillis;
      airPump1.state = IDLE;
    }
  }
  if (PistonPump1.isEnabled()) {
    PistonPump1.getWeight();
    Serial.println(PistonPump1.state);

    if (PistonPump1.state == IDLE && (currentMillis - PistonPump1.lastToggle) > PistonPump1.time_off) {
      Serial.println("Condition 1");
      PistonPump1.stimuli(1);  // Run one step
      PistonPump1.lastToggle = currentMillis;
      PistonPump1.state = RUNNING;
      currentMillis = millis();

    } else if (PistonPump1.state == RUNNING && (currentMillis - PistonPump1.lastToggle) > PistonPump1.time_on) {
      Serial.println("Condition 2");
      PistonPump1.lastToggle = currentMillis;
      PistonPump1.state = IDLE;
      currentMillis = millis();

    } else if (PistonPump1.state == RUNNING) {
      Serial.println("Condition 3");
      PistonPump1.stimuli(1);  // Run one step
      currentMillis = millis();

    } else {
      Serial.println("Condition 4");
      PistonPump1.getWeight();
    }
  }

  if (Peristaltic1.isEnabled()) {
    if (Peristaltic1.state == IDLE && (currentMillis - Peristaltic1.lastToggle) > Peristaltic1.time_off) {
      Peristaltic1.turnOn();
      Peristaltic1.lastToggle = currentMillis;
      Peristaltic1.state = RUNNING;
    } else if (Peristaltic1.state == RUNNING && (currentMillis - Peristaltic1.lastToggle) > Peristaltic1.time_on) {
      Peristaltic1.turnOff();
      Peristaltic1.lastToggle = currentMillis;
      Peristaltic1.state = IDLE;
    }
  }


  if (LED1.isEnabled()) {
    if (LED1.state == IDLE && (currentMillis - LED1.lastToggle) > LED1.time_off) {
      LED1.turnOn();
      LED1.lastToggle = currentMillis;
      LED1.state = RUNNING;
    } else if (LED1.state == RUNNING && (currentMillis - LED1.lastToggle) > LED1.time_on) {
      LED1.turnOff();
      LED1.lastToggle = currentMillis;
      LED1.state = IDLE;
    }
  }
}

bool initializeFileSystem() {
  if (!LittleFS.begin()) {
    Serial.println("Failed to mount file system. Formatting...");
    LittleFS.format();  // Reformat the filesystem
    if (!LittleFS.begin()) {
      Serial.println("Failed to mount file system after formatting");
      return false;
    }
  }
  return true;
}

void handleConfigFile() {
  if (LittleFS.exists(ConfigFileName)) {
    if (resetFile) {
      eraseFile(ConfigFileName);
      Serial.println("Config file deleted. Creating default...");
      saveJson(defaultJson);
      printJson();
      updateParameters(defaultJson);  // Load default parameters
    } else {
      Serial.println("Config file exists. Loading...");
      printJson();
      File file = LittleFS.open(ConfigFileName, "r");
      String jsonString = file.readString();
      file.close();
      updateParameters(jsonString);  // Load initial parameters
    }
  } else {
    Serial.println("No config file found. Creating default...");
    saveJson(defaultJson);
    printJson();
    updateParameters(defaultJson);  // Load default parameters
  }
}

void eraseFile(const String& fileName) {
  LittleFS.remove(fileName);
}

void saveJson(const String& jsonString) {
  File file = LittleFS.open(ConfigFileName, "w");
  if (file) {
    file.print(jsonString);
    file.close();
  } else {
    Serial.println("Failed to create config file");
  }
}

void printJson() {
  File file = LittleFS.open(ConfigFileName, "r");
  if (file) {
    while (file.available()) {
      Serial.write(file.read());
    }
    Serial.println();
    file.close();
  } else {
    Serial.println("Failed to open config file for reading");
  }
}


void updateJson(const String& updateString) {
  Serial.println("Updating JSON...");
  if (!LittleFS.begin()) {
    Serial.println("Failed to mount FS");
    return;
  }

  File file = LittleFS.open("/config.json", "r");
  if (!file) {
    Serial.println("Failed to open config file for reading");
    return;
  }

  size_t size = file.size();
  std::unique_ptr<char[]> buf(new char[size]);
  file.readBytes(buf.get(), size);
  DynamicJsonDocument doc(2048);
  DeserializationError error = deserializeJson(doc, buf.get());
  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }
  file.close();

  Serial.println("Current JSON:");
  serializeJson(doc, Serial);
  Serial.println();

  DynamicJsonDocument updateDoc(2048);
  error = deserializeJson(updateDoc, updateString);
  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  Serial.println("Update JSON:");
  serializeJson(updateDoc, Serial);
  Serial.println();

  JsonObject updateObj = updateDoc.as<JsonObject>();
  JsonObject docObj = doc.as<JsonObject>();

  mergeJson(docObj, updateObj);

  Serial.println("Merged JSON:");
  serializeJson(doc, Serial);
  Serial.println();

  file = LittleFS.open("/config.json", "w");
  if (!file) {
    Serial.println("Failed to open config file for writing");
    return;
  }
  if (serializeJson(doc, file) == 0) {
    Serial.println("Failed to write to config file");
  }
  file.close();
}

void mergeJson(JsonObject& dest, JsonObject& src) {
  for (JsonPair kv : src) {
    if (src[kv.key()].is<JsonObject>()) {
      if (!dest.containsKey(kv.key()) || !dest[kv.key()].is<JsonObject>()) {
        dest[kv.key()] = JsonObject();
      }
      JsonObject subDest = dest[kv.key()].as<JsonObject>();
      JsonObject subSrc = kv.value().as<JsonObject>();
      mergeJson(subDest, subSrc);
    } else {
      dest[kv.key()] = kv.value();
    }
  }
}

void updateParameters(const String& jsonString) {
  StaticJsonDocument<2048> doc;
  DeserializationError error = deserializeJson(doc, jsonString);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  if (doc["PistonPump1"].containsKey("enable")) {
    bool PistonPump1_enable = doc["PistonPump1"]["enable"];
    PistonPump1.setEnabled(PistonPump1_enable);
  }

  if (doc["PistonPump1"].containsKey("time_on")) {
    int PistonPump1_time_on = doc["PistonPump1"]["time_on"];
    PistonPump1.time_on = PistonPump1_time_on;
  }

  if (doc["PistonPump1"].containsKey("time_off")) {
    int PistonPump1_time_off = doc["PistonPump1"]["time_off"];
    PistonPump1.time_off = PistonPump1_time_off;
  }

  if (doc["PistonPump1"].containsKey("threshold")) {
    int PistonPump1_threshold = doc["PistonPump1"]["threshold"];
    PistonPump1.threshold = PistonPump1_threshold;
  }

  if (doc["PistonPump1"].containsKey("speed")) {
    float PistonPump1_speed = doc["PistonPump1"]["speed"];
    PistonPump1.speed = PistonPump1_speed;
  }

  if (doc["PistonPump1"].containsKey("max_step")) {
    int PistonPump1_maxStep = doc["PistonPump1"]["max_step"];
    PistonPump1.maxStep = PistonPump1_maxStep;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  if (doc["AirPump1"].containsKey("enable")) {
    bool AirPump1_enable = doc["AirPump1"]["enable"];
    airPump1.setEnabled(AirPump1_enable);
  }

  if (doc["AirPump1"].containsKey("time_on")) {
    int AirPump1_time_on = doc["AirPump1"]["time_on"];
    airPump1.time_on = AirPump1_time_on;
  }

  if (doc["AirPump1"].containsKey("time_off")) {
    int AirPump1_time_off = doc["AirPump1"]["time_off"];
    airPump1.time_off = AirPump1_time_off;
  }

  if (doc["AirPump1"].containsKey("intensity")) {
    int AirPump1_intensity = doc["AirPump1"]["intensity"];
    airPump1.setIntensity(AirPump1_intensity);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  if (doc["PeristalticPump1"].containsKey("enable")) {
    bool Peristaltic1_enable = doc["PeristalticPump1"]["enable"];
    Peristaltic1.setEnabled(Peristaltic1_enable);
  }

  if (doc["PeristalticPump1"].containsKey("time_on")) {
    int Peristaltic1_time_on = doc["PeristalticPump1"]["time_on"];
    Peristaltic1.time_on = Peristaltic1_time_on;
  }

  if (doc["PeristalticPump1"].containsKey("time_off")) {
    int Peristaltic1_time_off = doc["PeristalticPump1"]["time_off"];
    Peristaltic1.time_off = Peristaltic1_time_off;
  }

  if (doc["PeristalticPump1"].containsKey("speed")) {
    int Peristaltic1_speed = doc["PeristalticPump1"]["speed"];
    Peristaltic1.speed = Peristaltic1_speed;
  }

  if (doc["PeristalticPump1"].containsKey("direction")) {
    bool Peristaltic1_direction = doc["PeristalticPump1"]["direction"];
    Peristaltic1.direction = Peristaltic1_direction;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////

    if (doc["Valve1"].containsKey("enable")) {
    bool Valve1_enable = doc["Valve1"]["enable"];
    Valve1.setEnabled(Valve1_enable);
  }
  
  if (doc["Valve1"].containsKey("angle")) {
    int Valve1_angle = doc["Valve1"]["angle"];
    Valve1.setAngle(Valve1_angle);
  }
///////////////////////////////////////////////////////////
  if (doc["LED1"].containsKey("enable")) {
    bool LED1_enable = doc["LED1"]["enable"];
    LED1.setEnabled(LED1_enable);
  }

  if (doc["LED1"].containsKey("time_on")) {
    int LED1_time_on = doc["LED1"]["time_on"];
    LED1.time_on = LED1_time_on;
  }

  if (doc["LED1"].containsKey("time_off")) {
    int LED1_time_off = doc["LED1"]["time_off"];
    LED1.time_off = LED1_time_off;
  }

  if (doc["LED1"].containsKey("intensity")) {
    int LED1_intensity = doc["LED1"]["intensity"];
    LED1.setIntensity(LED1_intensity);
  }
  //   if (doc["PistonPump1"].containsKey("max_step")) {
  //   int PistonPump1_maxStep = doc["PistonPump1"]["max_step"];
  //   PistonPump1.maxStep = PistonPump1_maxStep;
  // }

  // if (doc["PistonPump1"].containsKey("enable")) {
  //   bool PistonPump1_enable = doc["PistonPump1"]["enable"];
  //   PistonPump1.setEnabled(PistonPump1_enable);
  // }

  // if (doc["PistonPump1"].containsKey("time_on")) {
  //   int PistonPump1_time_on = doc["PistonPump1"]["time_on"];
  //   PistonPump1.time_on = PistonPump1_time_on;
  // }

  // if (doc["PistonPump1"].containsKey("time_off")) {
  //   int PistonPump1_time_off = doc["PistonPump1"]["time_off"];
  //   PistonPump1.time_off = PistonPump1_time_off;
  // }

  // if (doc["PistonPump1"].containsKey("threshold")) {
  //   int PistonPump1_threshold = doc["PistonPump1"]["threshold"];
  //   PistonPump1.threshold = PistonPump1_threshold;
  // }

  // if (doc["PistonPump1"].containsKey("speed")) {
  //   float PistonPump1_speed = doc["PistonPump1"]["speed"];
  //   PistonPump1.speed = PistonPump1_speed;
  // }

  //   if (doc["PistonPump1"].containsKey("max_step")) {
  //   int PistonPump1_maxStep = doc["PistonPump1"]["max_step"];
  //   PistonPump1.maxStep = PistonPump1_maxStep;
  // }
}
