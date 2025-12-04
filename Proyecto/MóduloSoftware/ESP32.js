#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <Keypad.h>

// -------------------- CONFIG DHT11 --------------------
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// -------------------- CONFIG LCD I2C --------------------
// Cambia 0x27 por la dirección real de tu pantalla (la que te dio el escáner I2C)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// -------------------- LED --------------------
const int LED_PIN = 15;

// -------------------- TECLADO 4x4 --------------------
const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

// Conexión del teclado (ya la probaste)
byte rowPins[ROWS] = {13, 12, 14, 27}; // R1-R4
byte colPins[COLS] = {26, 25, 33, 32}; // C1-C4

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

// -------------------- WiFi AP --------------------
const char* ap_ssid = "Humedad_ESP32";
const char* ap_pass = "12345678";
WebServer server(80);

// -------------------- VARIABLES HUMEDAD / TEMPERATURA --------------------
float humedad = 0;
float temperatura = 0;

// Límites iniciales (puedes cambiarlos)
int humMin = 40;
int humMax = 70;
int tempMin = 18;
int tempMax = 30;

unsigned long ultimaLecturaDHT = 0;
const unsigned long PERIODO_DHT_MS = 2000;

bool ledState = true;
unsigned long ultimoParpadeo = 0;
const unsigned long PERIODO_PARPADEO_MS = 500;

// -------------------- BATERÍA (ADC) --------------------
// Pin ADC para medir batería (usar GPIO 35)
const int BATTERY_PIN = 35;

// Divisor resistivo: batería+ -> R1 -> pin, pin -> R2 -> GND
const float R1 = 100000.0;  // 100k
const float R2 = 100000.0;  // 100k

// Límites aproximados LiPo 1S
const float BAT_MIN_V = 3.0; // casi vacía
const float BAT_MAX_V = 4.2; // llena

float batteryVoltage = 0.0;
int batteryPercent = 0;

// -------------------- ESTADOS DE PANTALLA --------------------
enum ModoPantalla {
  MODO_NORMAL,
  MODO_EDIT_HUM_MIN,
  MODO_EDIT_HUM_MAX,
  MODO_EDIT_TEMP_MIN,
  MODO_EDIT_TEMP_MAX
};

ModoPantalla modo = MODO_NORMAL;
String bufferEntrada = "";

// 3 pantallas:
// 0 -> valores actuales
// 1 -> límites humedad
// 2 -> límites temperatura
byte pantallaActual = 0;

// ============================================================
//                FUNCIONES AUXILIARES GENERALES
// ============================================================
bool hayAlerta() {
  bool alertaH = (humedad < humMin) || (humedad > humMax);
  bool alertaT = (temperatura < tempMin) || (temperatura > tempMax);
  return alertaH || alertaT;
}

// ============================================================
//                INTERFAZ WEB (HTML + JS)
// ============================================================
String buildMainPage(const String &notice) {
  bool alerta = hayAlerta();
  String estado = alerta ? "ALERTA" : "NORMAL";

  String html;
  html.reserve(6000);

  html += "<!DOCTYPE html><html lang='es'><head>";
  html += "<meta charset='UTF-8'>";
  html += "<meta name='viewport' content='width=device-width,initial-scale=1.0'>";
  html += "<title>Control de Humedad y Temp</title>";
  html += "<style>";
  html += "body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;";
  html += "background:linear-gradient(135deg,#0f172a,#1e293b);color:#e5e7eb;display:flex;";
  html += "align-items:center;justify-content:center;min-height:100vh;padding:16px;}";
  html += ".card{background:#020617cc;backdrop-filter:blur(10px);border-radius:16px;";
  html += "max-width:420px;width:100%;padding:20px 20px 24px;box-shadow:0 20px 35px rgba(0,0,0,.5);}";
  html += ".title{font-size:1.4rem;font-weight:600;margin-bottom:4px;}";
  html += ".subtitle{font-size:.80rem;color:#9ca3af;margin-bottom:16px;}";
  html += ".grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:16px;}";
  html += ".metric{background:#020617;border-radius:12px;padding:10px 12px;border:1px solid #1f2937;}";
  html += ".metric-label{font-size:.75rem;color:#9ca3af;}";
  html += ".metric-value{font-size:1.2rem;font-weight:600;margin-top:4px;}";
  html += ".metric-badge{display:inline-flex;align-items:center;gap:6px;font-size:.70rem;";
  html += "padding:2px 8px;border-radius:999px;margin-top:6px;}";
  html += ".badge-ok{background:#022c22;color:#6ee7b7;border:1px solid #065f46;}";
  html += ".badge-alert{background:#450a0a;color:#fecaca;border:1px solid #b91c1c;}";
  html += "form{margin-top:8px;display:grid;grid-template-columns:1fr;gap:10px;}";
  html += ".field{display:flex;flex-direction:column;gap:4px;}";
  html += "label{font-size:.8rem;color:#9ca3af;}";
  html += "input[type='number']{border-radius:8px;border:1px solid #374151;background:#020617;";
  html += "padding:6px 10px;color:#e5e7eb;font-size:.9rem;outline:none;}";
  html += "input[type='number']:focus{border-color:#3b82f6;box-shadow:0 0 0 1px #3b82f6;}";
  html += ".btn-primary{margin-top:4px;width:100%;border:none;border-radius:999px;padding:8px 12px;";
  html += "font-size:.9rem;font-weight:500;background:linear-gradient(135deg,#3b82f6,#22c55e);";
  html += "color:white;cursor:pointer;}";
  html += ".btn-primary:active{transform:scale(.98);}";
  html += ".notice{margin-top:10px;font-size:.78rem;border-radius:8px;padding:6px 10px;";
  html += "background:#111827;border:1px solid #374151;color:#e5e7eb;}";
  html += ".footer{margin-top:10px;font-size:.7rem;color:#6b7280;text-align:center;}";
  html += "</style>";

  // Script: actualiza lecturas y sincroniza inputs si no los estás editando
  html += "<script>";
  html += "function updateData(){fetch('/data').then(r=>r.json()).then(d=>{";
  html += "document.getElementById('humAct').innerText=d.h.toFixed(1)+' %';";
  html += "document.getElementById('tempAct').innerText=d.t.toFixed(1)+' °C';";
  html += "document.getElementById('humMin').innerText=d.hmin+' %';";
  html += "document.getElementById('humMax').innerText=d.hmax+' %';";
  html += "document.getElementById('tMin').innerText=d.tmin+' °C';";
  html += "document.getElementById('tMax').innerText=d.tmax+' °C';";
  html += "document.getElementById('batt').innerText=d.batt+' %';";
  html += "var estadoEl=document.getElementById('estado');";
  html += "estadoEl.innerText=d.estado;";
  html += "estadoEl.className='metric-badge '+(d.estado==='NORMAL'?'badge-ok':'badge-alert');";
  html += "var hminInput=document.getElementById('hminInput');";
  html += "var hmaxInput=document.getElementById('hmaxInput');";
  html += "var tminInput=document.getElementById('tminInput');";
  html += "var tmaxInput=document.getElementById('tmaxInput');";
  html += "if(document.activeElement!==hminInput){hminInput.value=d.hmin;}";
  html += "if(document.activeElement!==hmaxInput){hmaxInput.value=d.hmax;}";
  html += "if(document.activeElement!==tminInput){tminInput.value=d.tmin;}";
  html += "if(document.activeElement!==tmaxInput){tmaxInput.value=d.tmax;}";
  html += "});}";
  html += "setInterval(updateData,3000);";
  html += "window.addEventListener('load',updateData);";
  html += "</script>";

  html += "</head><body><div class='card'>";
  html += "<div class='title'>Panel de Humedad y Temperatura</div>";
  html += "<div class='subtitle'>ESP32 · Punto de acceso interno</div>";

  html += "<div class='grid'>";

  // Humedad actual
  html += "<div class='metric'><div class='metric-label'>Humedad actual</div>";
  html += "<div class='metric-value' id='humAct'>";
  html += String(humedad, 1); html += " %</div></div>";

  // Temperatura actual
  html += "<div class='metric'><div class='metric-label'>Temperatura actual</div>";
  html += "<div class='metric-value' id='tempAct'>";
  html += String(temperatura, 1); html += " °C</div></div>";

  // Humedad mínima
  html += "<div class='metric'><div class='metric-label'>Humedad mínima</div>";
  html += "<div class='metric-value' id='humMin'>";
  html += String(humMin); html += " %</div></div>";

  // Humedad máxima + estado
  html += "<div class='metric'><div class='metric-label'>Humedad máxima</div>";
  html += "<div class='metric-value' id='humMax'>";
  html += String(humMax); html += " %</div>";
  html += "<div id='estado' class='metric-badge ";
  html += alerta ? "badge-alert'>" : "badge-ok'>";
  html += estado;
  html += "</div></div>";

  // Temperatura mínima
  html += "<div class='metric'><div class='metric-label'>Temp. mínima</div>";
  html += "<div class='metric-value' id='tMin'>";
  html += String(tempMin); html += " °C</div></div>";

  // Temperatura máxima
  html += "<div class='metric'><div class='metric-label'>Temp. máxima</div>";
  html += "<div class='metric-value' id='tMax'>";
  html += String(tempMax); html += " °C</div></div>";

  // Batería
  html += "<div class='metric'><div class='metric-label'>Batería</div>";
  html += "<div class='metric-value' id='batt'>";
  html += String(batteryPercent); html += " %</div></div>";

  html += "</div>"; // fin grid

  // Formulario para editar límites
  html += "<form action='/set' method='GET'>";
  html += "<div class='field'><label for='hminInput'>Humedad mínima (%)</label>";
  html += "<input id='hminInput' type='number' name='hmin' min='0' max='100' value='";
  html += String(humMin); html += "'></div>";

  html += "<div class='field'><label for='hmaxInput'>Humedad máxima (%)</label>";
  html += "<input id='hmaxInput' type='number' name='hmax' min='0' max='100' value='";
  html += String(humMax); html += "'></div>";

  html += "<div class='field'><label for='tminInput'>Temperatura mínima (°C)</label>";
  html += "<input id='tminInput' type='number' name='tmin' min='-40' max='80' value='";
  html += String(tempMin); html += "'></div>";

  html += "<div class='field'><label for='tmaxInput'>Temperatura máxima (°C)</label>";
  html += "<input id='tmaxInput' type='number' name='tmax' min='-40' max='80' value='";
  html += String(tempMax); html += "'></div>";

  html += "<button class='btn-primary' type='submit'>Guardar cambios</button>";
  html += "</form>";

  if (notice.length() > 0) {
    html += "<div class='notice'>" + notice + "</div>";
  }

  html += "<div class='footer'>Conéctate a <b>";
  html += ap_ssid;
  html += "</b> · LED fijo = normal, parpadeo = alerta</div>";

  html += "</div></body></html>";

  return html;
}

// -------------------- Handlers del servidor web --------------------
void handleRoot() {
  server.send(200, "text/html", buildMainPage(""));
}

void handleSet() {
  String msg = "";
  if (server.hasArg("hmin") && server.hasArg("hmax") &&
      server.hasArg("tmin") && server.hasArg("tmax")) {

    int nuevoHMin = server.arg("hmin").toInt();
    int nuevoHMax = server.arg("hmax").toInt();
    int nuevoTMin = server.arg("tmin").toInt();
    int nuevoTMax = server.arg("tmax").toInt();

    bool okHum = (nuevoHMin >= 0 && nuevoHMin <= 100 &&
                  nuevoHMax >= 0 && nuevoHMax <= 100 &&
                  nuevoHMin < nuevoHMax);

    bool okTemp = (nuevoTMin > -40 && nuevoTMin < 80 &&
                   nuevoTMax > -40 && nuevoTMax < 80 &&
                   nuevoTMin < nuevoTMax);

    if (okHum && okTemp) {
      humMin = nuevoHMin;
      humMax = nuevoHMax;
      tempMin = nuevoTMin;
      tempMax = nuevoTMax;
      msg = "Límites actualizados correctamente.";

      if (modo == MODO_NORMAL) {
        // refrescar LCD
        lcd.clear();
        pantallaActual = 0;
        // se actualizará bien en la siguiente lectura de DHT
      }
    } else {
      msg = "Valores inválidos. Revisa que Min < Max y rangos sean correctos.";
    }
  } else {
    msg = "Faltan parámetros.";
  }

  server.send(200, "text/html", buildMainPage(msg));
}

void handleData() {
  bool alerta = hayAlerta();
  String json = "{";
  json += "\"h\":" + String(humedad, 1) + ",";
  json += "\"t\":" + String(temperatura, 1) + ",";
  json += "\"hmin\":" + String(humMin) + ",";
  json += "\"hmax\":" + String(humMax) + ",";
  json += "\"tmin\":" + String(tempMin) + ",";
  json += "\"tmax\":" + String(tempMax) + ",";
  json += "\"batt\":" + String(batteryPercent) + ",";
  json += "\"estado\":\"";
  json += alerta ? "ALERTA" : "NORMAL";
  json += "\"}";
  server.send(200, "application/json", json);
}

void handleNotFound() {
  server.send(404, "text/plain", "No encontrado");
}

// ============================================================
//                FUNCIONES DE LÓGICA
// ============================================================
void refrescarPantalla() {
  lcd.clear();
  switch (pantallaActual) {
    case 0:  // Valores actuales
      lcd.setCursor(0, 0);
      lcd.print("H:");
      lcd.print((int)humedad);
      lcd.print("% T:");
      lcd.print((int)temperatura);
      lcd.print("C");

      lcd.setCursor(0, 1);
      lcd.print("Bt:");
      lcd.print(batteryPercent);
      lcd.print("% ");
      lcd.print(hayAlerta() ? "AL" : "OK");
      break;

    case 1:  // Límites de humedad
      lcd.setCursor(0, 0);
      lcd.print("HuMi:");
      lcd.print(humMin);
      lcd.setCursor(0, 1);
      lcd.print("HuMx:");
      lcd.print(humMax);
      break;

    case 2:  // Límites de temperatura
      lcd.setCursor(0, 0);
      lcd.print("TeMi:");
      lcd.print(tempMin);
      lcd.setCursor(0, 1);
      lcd.print("TeMx:");
      lcd.print(tempMax);
      break;
  }
}

void mostrarPantallaEdicion(const char* texto) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(texto);
  lcd.setCursor(0, 1);
  lcd.print("Valor: ");
  lcd.print(bufferEntrada);
}

void leerBateria() {
  int raw = analogRead(BATTERY_PIN);          // 0 - 4095
  float vAdc = (raw / 4095.0) * 3.3;          // Voltaje en el pin
  float vBat = vAdc * (R1 + R2) / R2;         // Voltaje real

  batteryVoltage = vBat;

  float pct = (vBat - BAT_MIN_V) * 100.0 / (BAT_MAX_V - BAT_MIN_V);
  if (pct < 0) pct = 0;
  if (pct > 100) pct = 100;

  batteryPercent = (int)pct;
}

void leerDHT() {
  unsigned long ahora = millis();
  if (ahora - ultimaLecturaDHT >= PERIODO_DHT_MS) {
    ultimaLecturaDHT = ahora;

    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (!isnan(h) && !isnan(t)) {
      humedad = h;
      temperatura = t;
    } else {
      Serial.println("Error leyendo DHT11");
    }

    leerBateria();  // Actualizamos batería al mismo ritmo
    if (modo == MODO_NORMAL) {
      refrescarPantalla();
    }
  }
}

void actualizarLED() {
  bool alerta = hayAlerta();

  if (!alerta) {
    ledState = true;
    digitalWrite(LED_PIN, HIGH);  // normal
  } else {
    unsigned long ahora = millis();
    if (ahora - ultimoParpadeo >= PERIODO_PARPADEO_MS) {
      ultimoParpadeo = ahora;
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState ? HIGH : LOW);
    }
  }
}

void procesarTeclado() {
  char tecla = keypad.getKey();
  if (!tecla) return;

  Serial.print("Tecla: ");
  Serial.println(tecla);

  switch (modo) {
    case MODO_NORMAL:
      // Cambiar de pantalla con 0
      if (tecla == '0') {
        pantallaActual = (pantallaActual + 1) % 3;
        refrescarPantalla();
      }
      // A -> editar HUMEDAD MIN
      else if (tecla == 'A') {
        modo = MODO_EDIT_HUM_MIN;
        bufferEntrada = "";
        mostrarPantallaEdicion("Edit HuMi");
      }
      // B -> editar HUMEDAD MAX
      else if (tecla == 'B') {
        modo = MODO_EDIT_HUM_MAX;
        bufferEntrada = "";
        mostrarPantallaEdicion("Edit HuMx");
      }
      // C -> editar TEMP MIN
      else if (tecla == 'C') {
        modo = MODO_EDIT_TEMP_MIN;
        bufferEntrada = "";
        mostrarPantallaEdicion("Edit TeMi");
      }
      // D -> editar TEMP MAX
      else if (tecla == 'D') {
        modo = MODO_EDIT_TEMP_MAX;
        bufferEntrada = "";
        mostrarPantallaEdicion("Edit TeMx");
      }
      break;

    case MODO_EDIT_HUM_MIN:
    case MODO_EDIT_HUM_MAX:
    case MODO_EDIT_TEMP_MIN:
    case MODO_EDIT_TEMP_MAX:
      if (tecla >= '0' && tecla <= '9') {
        if (bufferEntrada.length() < 3) { // máx 3 dígitos
          bufferEntrada += tecla;
          const char* txt = "Edit";
          if (modo == MODO_EDIT_HUM_MIN) txt = "Edit HuMi";
          else if (modo == MODO_EDIT_HUM_MAX) txt = "Edit HuMx";
          else if (modo == MODO_EDIT_TEMP_MIN) txt = "Edit TeMi";
          else if (modo == MODO_EDIT_TEMP_MAX) txt = "Edit TeMx";
          mostrarPantallaEdicion(txt);
        }
      } else if (tecla == '*') {
        // Cancelar
        bufferEntrada = "";
        modo = MODO_NORMAL;
        refrescarPantalla();
      } else if (tecla == '#') {
        // Guardar
        if (bufferEntrada.length() > 0) {
          int valor = bufferEntrada.toInt();
          bool valido = false;

          if (modo == MODO_EDIT_HUM_MIN) {
            if (valor >= 0 && valor <= 100 && valor < humMax) {
              humMin = valor;
              valido = true;
            }
          } else if (modo == MODO_EDIT_HUM_MAX) {
            if (valor >= 0 && valor <= 100 && valor > humMin) {
              humMax = valor;
              valido = true;
            }
          } else if (modo == MODO_EDIT_TEMP_MIN) {
            if (valor > -40 && valor < 80 && valor < tempMax) {
              tempMin = valor;
              valido = true;
            }
          } else if (modo == MODO_EDIT_TEMP_MAX) {
            if (valor > -40 && valor < 80 && valor > tempMin) {
              tempMax = valor;
              valido = true;
            }
          }

          if (!valido) {
            Serial.println("Valor invalido para ese limite.");
          }
        }
        bufferEntrada = "";
        modo = MODO_NORMAL;
        refrescarPantalla();
      }
      break;
  }
}

// ============================================================
//                        SETUP
// ============================================================
void setup() {
  Serial.begin(115200);
  delay(1000);

  // DHT
  dht.begin();

  // LCD
  Wire.begin(); // SDA=21, SCL=22 en ESP32
  lcd.init();
  lcd.backlight();

  // LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);

  // Batería
  pinMode(BATTERY_PIN, INPUT);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Sistema Ambiente");
  lcd.setCursor(0, 1);
  lcd.print("Iniciando...");
  delay(1500);

  leerBateria();
  refrescarPantalla();

  // WiFi AP
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ap_ssid, ap_pass);
  Serial.println("Punto de acceso iniciado.");
  Serial.print("SSID: ");
  Serial.println(ap_ssid);
  Serial.print("IP AP: ");
  Serial.println(WiFi.softAPIP());

  // Servidor web
  server.on("/", handleRoot);
  server.on("/set", handleSet);
  server.on("/data", handleData);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("Servidor web iniciado.");
}

// ============================================================
//                        LOOP
// ============================================================
void loop() {
  server.handleClient();  // Web
  procesarTeclado();      // Keypad
  leerDHT();              // Humedad + temperatura + batería + LCD
  actualizarLED();        // LED estado
}
