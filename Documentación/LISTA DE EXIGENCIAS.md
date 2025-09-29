
**1. Lista de Exigencias**


\*\


|**LISTA DE EXIGENCIAS**|**Páginas: 5**|||
| :-: | :- | :- | :- |
||**Edición: Revisión 1**|||
|**PROYECTO:**|**Diseño de scanner y aplicativo, identificador de productos a punto de vencer**|**Fecha: 11/09/2025**||
|||**Revisado:**||
|**CLIENTE:**|**UNIVERSIDAD PERUANA CAYETANO HEREDIA**|<p>**Elaborado:**</p><p>`    `**JR, MS,LN,YK**</p>||
|Fecha (cambios)|Deseo o Exigencia|**Descripción**|<p>**Responsable**</p><p></p>|
|**25/09/25**|<p></p><p></p><p>E</p>|<p>**Función Principal (APP):** Otorgar la opción de registrar a dueños de pequeñas bodegas con el objetivo de promocionar productos próximos a vencer , generando un respectivo descuento al producto. </p><p>**FUNCIÓN PRINCIPAL (escáner):** Escanear  códigos de barras de determinados lotes de productos de consumo humano, para identificar su fecha de vencimiento y enviarlo al APP.</p>|<p></p><p>      </p><p>LN</p>|
|**25/09/25**|<p></p><p></p>|<p>**Geometría (escáner):**  </p><p>Forma de pistola lectora con mango ergonómico de 148 mm de altura y 102 mm de largo. Lee códigos en cualquier orientación hasta 180°, con precisión mínima del 90% y tiempo de respuesta menor a 20 milisegundos.[(1)](https://www.zotero.org/google-docs/?broken=36TaMA)</p>|YK|
|**25/09/25**|E|**Cinemática (escáner)**: Un rango aproximado al escanear de 10 cm con una velocidad media de 2500 lecturas por segundo (scans/segundo), (ISO 24553).|<p></p><p>LN</p>|
|**25/09/25**|E|**Fuerzas (escáner):** Durante el momento de presionar el botón de encendido, la fuerza no debe ser mayor a 8N para evitar una ruptura o atascamiento del material (ISO 24553) .|<p>        </p><p>`         `JR</p>|
|**25/09/25**|E|<p>**ENERGÍA(escáner):** El escáner se alimenta directamente de una fuente de poder como la batería </p><p>**En funcionamiento**: en el momento de uso el consumo de energía es  de 0.5W a 2.5 W  aproximadamente.</p><p>**EN DESCANSO:** Cuando el escáner no está en uso su consumo de energía es nulo o aprox 0.1 W (ISO 24553)</p><p></p>|<p></p><p></p><p></p><p>MS</p><p></p><p></p><p></p>|
|**25/09/25**|E|<p>**SEÑALES:** Se cuenta con las siguientes señales de entrada y salida: </p><p>**Señales de entrada:**</p><p>- **Señal de encendido:** Activa los componentes electrónicos del escáner y del sistema de visión.</p><p>- **Señal de inicio de escaneo:** Indica al dispositivo que debe capturar la información de la etiqueta o código del producto.</p><p>**Señales de salida:**</p><p>- **Señal de estado del escaneo:** Indica si la lectura fue exitosa, fallida o requiere un nuevo intento.</p><p>- **Señal de alerta temprana:** Notifica que un producto está próximo a vencer según los parámetros configurados (ejemplo: 1 semana antes).</p>|<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p>MS</p>|
|**25/09/25**|E|**CONTROL**: Se implementa un proceso de control que supervisa cada etapa, desde el escaneo de la fecha de vencimiento hasta la transmisión de los datos al aplicativo. Se establecen mecanismos de verificación automática que validan la precisión del reconocimiento de fechas. “El sistema deberá incluir algoritmos OCR robustos que detecten y validan automáticamente la fecha de vencimiento leída antes de transmitir los datos al aplicativo”[(1)](https://www.zotero.org/google-docs/?Yg9zuT).|MS|
|**25/09/25**|E|**ELECTRÓNICA:** Un microcontrolador con sensor óptico  para la lectura de código de barras , una fuente de luz láser y un módulo de bluetooth para transmitir los datos de la aplicación , alimentado por una batería recargable. MIT App Inventor. (2023).|<p></p><p>`          `LN</p>|
|**25/09/25[**(2)**](https://www.zotero.org/google-docs/?x8SXTE)**|E|**SOFTWARE:** Se emplea JavaScript, CSS y HTML para el desarrollo de la interfaz, junto con una base de datos en SQL/MongoDB para la gestión de la información.([appinventor.mit.edu](http://appinventor.mit.edu) , 2025)|<p>  </p><p>`          `YK</p>|
|**25/09/25**|E|**COMUNICACIONES:** Los sensores infrarrojos escanean los códigos de un grupo determinado de productos alimenticios, además la conexión es mediante  una red distribuida que conecta dispositivos y objetos físicos, capaces de actuar o percibir el entorno, y de comunicarse entre sí y con otras máquinas.  **[(3)](https://www.zotero.org/google-docs/?8yyz80)**|<p>        </p><p>`          `MS</p>|
|**25/09/25**|E|<p>**Seguridad:** Para poder respaldar el funcionamiento de nuestra aplicación nos basamos en un marco legal actual que esté vigente estos son:</p><p>**a)** Ley Nº 29571 - Código de Protección y Defensa del Consumidor Artículo 5: Derecho a la información veraz y oportuna sobre fechas de vencimiento Artículo 23: Prohibición de comercialización de productos que representen riesgo.</p><p>**b)** Ley Nº 30988 - Ley de reducción y aprovechamiento de pérdidas y desperdicios de alimentos Promueve programas de reducción de desperdicio a nivel nacional, regional y local</p>|<p> </p><p></p><p></p><p></p><p>LN</p>|
|**25/09/25**|E|**Ergonomía**: El escáner tiene un peso ideal y distribuye su peso de manera uniforme, lo que evita que se desequilibre hacia un lado u otro. También posee un diámetro con medidas exactas para un agarre confortable. Esto satisface a los posibles usuarios según el marco legal de la Ley Nº 29783, que obliga a las empresas a utilizar productos que promueven la seguridad y salud de los trabajadores|MS|
|**25/09/25**|E|<p>**Fabricación:** El escáner  se está desarrollando con materiales accesibles que se encuentran fácilmente en el mercado, componentes electrónicos como el ESP(microcontrolador), y la fabricación del cuerpo será desarrollado  con materiales que serán  otorgados por la propia universidad,  como una impresora 3D. [(4)](https://www.zotero.org/google-docs/?oY3bpX)</p><p></p>|MS|
|**25/09/25**|E|**Montaje**: El escáner tiene un diseño tal que se atornilla de la parte baja y la parte superior. Esto nos produce estabilidad y una forma compacta, que resguarda los componentes internos|MS|
|**25/09/25**|E|**Transporte**: El equipo cuenta con un peso y dimensiones adecuadas para facilitar su transporte dentro del establecimiento comercial. Para trasladar la información capturada desde el escáner hasta la plataforma digital, se realiza una comunicación inalámbrica (Wi-Fi o Bluetooth), la cual es recogida en la nube.|MS|
|**25/09/25**|D|<p>**Uso (app) :** El uso de nuestra app se contempla que sea para bodegas pequeñas presentes en lugares que sean descentralizados.</p><p>El dueño de este negocio puede registrarse con el objetivo de hacer aviso sobre un producto próximo a vencer y el descuento respectivo que realizará</p><p>Functionality includes performance, ease of use, navigation, and design, while app quality was rated by engagement, aesthetics, functionality, and information.”[(4)](https://www.zotero.org/google-docs/?OmaTmz).</p><p>**Uso (scanner)** : El scanner usará sensores y proyecta una luz infrarroja con el objetivo de escanear el código de barras de un determinado grupo de productos previamente registrado, toda la información que reciba será recepcionada y envíada vía WIFI o bluetooth a la APP.</p>|<p></p><p></p><p></p><p></p><p>LN y MS</p>|
|**25/09/25**|D|<p>**Mantenimiento:**  </p><p>Se incluyen  actualizaciones de forma secuencial en la app con el fin de mejorar y ver posibles problemas iniciales en la app.</p><p></p><p></p><p>Los componentes del escáner: se estila el reemplazo de estos,   inmediatamente después de verificar si algún  componente tiene falla .</p>|<p></p><p>`       `JR</p>|
|**25/09/25**|E|<p>**Costos:** Considerando el uso de un scanner con un precio por unidad de s/ 164 más el costo de el desarrollo de nuestra aplicación con un estimado  por sus componentes( [rapicompra peru.com](http://rapicomprasperu.com), 2025 ) :</p><p>- Usando herramientas como MIT App Inventor, Modular, o incluso Flutter Flow (low-code).</p><p>- Arduino: 164 (placa + lector código de barras + cámara básica).</p><p>- Desarrollo de la app (ustedes mismos con soporte open source): costo ≈ 600 ,dependiendo si se contrata algún apoyo para diseño gráfico, (open source, 2025).</p><p>Con un total de s/ 764 y tocando a s/191 por integrante del grupo.</p>|<p></p><p></p><p></p><p></p><p>LN</p>|
|**25/09/25**|E|**Plazos:** El proyecto empieza el miércoles 25 de septiembre y  espera su finalización el miércoles 9 de diciembre a las 8 a.m. con un total aproximado de 138 horas de trabajo. Se elaboró un diagrama de Gantt para observar el flujo de trabajo, marcando las sustentaciones y entregas principales con hitos marcados.|<p></p><p>MS , LN y YK</p>|






**Bibliografía**:



[1.	Zheng J, Li J, Ding Z, Kong L, Chen Q. Recognition of expiry data on food packages based on improved DBNet. Connect Sci. 31 de diciembre de 2023;35(1):1-16.](https://www.zotero.org/google-docs/?MO0WVE)

[2.	](https://www.zotero.org/google-docs/?MO0WVE)MIT App Inventor. (2023). *Getting Started with App Inventor*. <https://appinventor.mit.edu>

[3.	De Nerol I, Putra Syam Satria R, Rasyid Parmana R, Octavia N, Mukti Darmawan MD, Mohamad Alvin Renaldi M, et al. IoT-Based Barcode Scanning System for Production and Warehouse Management. J Appl Sci Technol Humanit. 28 de febrero de 2024;1(1):72-86.](https://www.zotero.org/google-docs/?MO0WVE)

[4.	Haas R, Aşan H, Doğan O, Michalek CR, Karaca Akkan Ö, Bulut ZA. Designing and Implementing the MySusCof App—A Mobile App to Support Food Waste Reduction. Foods. enero de 2022;11(15):2222.](https://www.zotero.org/google-docs/?MO0WVE)

6\.  RapiComprasPeru. (s. f.). *Compra rápido y fácil desde cualquier parte del Perú*. Recuperado de[ ](https://rapicomprasperu.com/?utm_source=chatgpt.com)<https://rapicomprasperu.com>

7\. Perú. (2011). *Ley de Seguridad y Salud en el Trabajo*. Ley Nº 29783: <https://diariooficial.elperuano.pe/Normas/obtenerDocumento?idNorma=38>

8 .ISO. (2023). *ISO 24553:2023 – Ergonomics — Accessible design — Controls, actuators and operability: minimum specifications*. International Organization for Standardization. <https://www.iso.org/standard/82984.html> 







