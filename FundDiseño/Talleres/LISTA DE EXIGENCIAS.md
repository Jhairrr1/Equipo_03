
**1. Lista de Exigencias**


\*\


<table><tr><th colspan="3" rowspan="2" valign="top"><b>LISTA DE EXIGENCIAS</b></th><th valign="top"><b>Páginas: 5</b></th></tr>
<tr><td valign="top"><b>Edición: Revisión 1</b></td></tr>
<tr><td colspan="2" rowspan="2" valign="top"><b>PROYECTO:</b></td><td rowspan="2" valign="top"><b>Diseño de scanner y aplicativo, identificador de productos a punto de vencer</b></td><td valign="top"><b>Fecha: 11/09/2025</b></td></tr>
<tr><td valign="top"><b>Revisado:</b></td></tr>
<tr><td colspan="2" valign="top"><b>CLIENTE:</b></td><td valign="top"><b>UNIVERSIDAD PERUANA CAYETANO HEREDIA</b></td><td valign="top"><p><b>Elaborado:</b></p><p>`    `<b>JR, MS,LN,YK</b></p></td></tr>
<tr><td valign="top">Fecha (cambios)</td><td valign="top">Deseo o Exigencia</td><td valign="top"><b>Descripción</b></td><td valign="top"><p><b>Responsable</b></p><p></p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top"><p></p><p></p><p>E</p></td><td valign="top"><p><b>Función Principal (APP):</b> Otorga la opción de</b> registrar a dueños de pequeñas bodegas con el objetivo de promocionar productos próximos a vencer , generando un respectivo descuento al producto. </p><p><b>FUNCIÓN PRINCIPAL (escáner):</b> Escanear  códigos de barras de determinados lotes de productos de consumo humano, para identificar su fecha de vencimiento y enviarlo al APP.</p></td><td valign="top"><p></p><p>      </p><p>LN</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top"><p></p><p></p></td><td valign="top"><p><b>Geometría (escáner):</b>  </p><p>Forma de pistola lectora con mango ergonómico de 148 mm de altura y 102 mm de largo. Lee códigos en cualquier orientación hasta 180°, con precisión mínima del 90% y tiempo de respuesta menor a 20 milisegundos.[(1)](https://www.zotero.org/google-docs/?broken=36TaMA)</p></td><td valign="top">YK</td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>Cinemática (escáner)</b>: Un rango aproximado al escanear de 10 cm con una velocidad media de 2500 lecturas por segundo (scans/segundo), (ISO 24553).</td><td valign="top"><p></p><p>LN</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>Fuerzas (escáner):</b> Durante el momento de presionar el botón de encendido, la fuerza no debe ser mayor a 8N para evitar una ruptura o atascamiento del material (ISO 24553) .</td><td valign="top"><p>        </p><p>`         `JR</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><p><b>ENERGÍA(escáner):</b> El escáner se alimenta directamente de una fuente de poder como la batería </p><p><b>En funcionamiento</b>: en el momento de uso el consumo de energía es  de 0.5W a 2.5 W  aproximadamente.</p><p><b>EN DESCANSO:</b> Cuando el escáner no está en uso su consumo de energía es nulo o aprox 0.1 W (ISO 24553)</p><p></p></td><td valign="top"><p></p><p></p><p></p><p>MS</p><p></p><p></p><p></p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><p><b>SEÑALES:</b> Se cuenta con las siguientes señales de entrada y salida: </p><p><b>Señales de entrada:</b></p><p>- <b>Señal de encendido:</b> Activa los componentes electrónicos del escáner y del sistema de visión.</p><p>- <b>Señal de inicio de escaneo:</b> Indica al dispositivo que debe capturar la información de la etiqueta o código del producto.</p><p><b>Señales de salida:</b></p><p>- <b>Señal de estado del escaneo:</b> Indica si la lectura fue exitosa, fallida o requiere un nuevo intento.</p><p>- <b>Señal de alerta temprana:</b> Notifica que un producto está próximo a vencer según los parámetros configurados (ejemplo: 1 semana antes).</p></td><td valign="top"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p>MS</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>CONTROL</b>: Se implementa un proceso de control que supervisa cada etapa, desde el escaneo de la fecha de vencimiento hasta la transmisión de los datos al aplicativo. Se establecen mecanismos de verificación automática que validan la precisión del reconocimiento de fechas. “El sistema deberá incluir algoritmos OCR robustos que detecten y validan automáticamente la fecha de vencimiento leída antes de transmitir los datos al aplicativo”[(1)](https://www.zotero.org/google-docs/?Yg9zuT).</td><td valign="top">MS</td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>ELECTRÓNICA:</b> Un microcontrolador con sensor óptico  para la lectura de código de barras , una fuente de luz láser y un módulo de bluetooth para transmitir los datos de la aplicación , alimentado por una batería recargable. MIT App Inventor. (2023).</td><td valign="top"><p></p><p>`          `LN</p></td></tr>
<tr><td valign="top"><b>25/09/25[<b>(2)</b>](https://www.zotero.org/google-docs/?x8SXTE)</b></td><td valign="top">E</td><td valign="top"><b>SOFTWARE:</b> Se emplea JavaScript, CSS y HTML para el desarrollo de la interfaz, junto con una base de datos en SQL/MongoDB para la gestión de la información.([appinventor.mit.edu](http://appinventor.mit.edu) , 2025)</td><td valign="top"><p>  </p><p>`          `YK</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>COMUNICACIONES:</b> Los sensores infrarrojos escanean los códigos de un grupo determinado de productos alimenticios, además la conexión es mediante  una red distribuida que conecta dispositivos y objetos físicos, capaces de actuar o percibir el entorno, y de comunicarse entre sí y con otras máquinas.  <b>[(3)](https://www.zotero.org/google-docs/?8yyz80)</b></td><td valign="top"><p>        </p><p>`          `MS</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><p><b>Seguridad:</b> Para poder respaldar el funcionamiento de nuestra aplicación nos basamos en un marco legal actual que esté vigente estos son:</p><p><b>a)</b> Ley Nº 29571 - Código de Protección y Defensa del Consumidor Artículo 5: Derecho a la información veraz y oportuna sobre fechas de vencimiento Artículo 23: Prohibición de comercialización de productos que representen riesgo.</p><p><b>b)</b> Ley Nº 30988 - Ley de reducción y aprovechamiento de pérdidas y desperdicios de alimentos Promueve programas de reducción de desperdicio a nivel nacional, regional y local</p></td><td valign="top"><p> </p><p></p><p></p><p></p><p>LN</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>Ergonomía</b>: El escáner tiene un peso ideal y distribuye su peso de manera uniforme, lo que evita que se desequilibre hacia un lado u otro. También posee un diámetro con medidas exactas para un agarre confortable. Esto satisface a los posibles usuarios según el marco legal de la Ley Nº 29783, que obliga a las empresas a utilizar productos que promueven la seguridad y salud de los trabajadores</td><td valign="top">MS</td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><p><b>Fabricación:</b> El escáner  se está desarrollando con materiales accesibles que se encuentran fácilmente en el mercado, componentes electrónicos como el ESP(microcontrolador), y la fabricación del cuerpo será desarrollado  con materiales que serán  otorgados por la propia universidad,  como una impresora 3D. [(4)](https://www.zotero.org/google-docs/?oY3bpX)</p><p></p></td><td valign="top">MS</td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>Montaje</b>: El escáner tiene un diseño tal que se atornilla de la parte baja y la parte superior. Esto nos produce estabilidad y una forma compacta, que resguarda los componentes internos</td><td valign="top">MS</td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>Transporte</b>: El equipo cuenta con un peso y dimensiones adecuadas para facilitar su transporte dentro del establecimiento comercial. Para trasladar la información capturada desde el escáner hasta la plataforma digital, se realiza una comunicación inalámbrica (Wi-Fi o Bluetooth), la cual es recogida en la nube.</td><td valign="top">MS</td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">D</td><td valign="top"><p><b>Uso (app) :</b> El uso de nuestra app se contempla que sea para bodegas pequeñas presentes en lugares que sean descentralizados.</p><p>El dueño de este negocio puede registrarse con el objetivo de hacer aviso sobre un producto próximo a vencer y el descuento respectivo que realizará</p><p>Functionality includes performance, ease of use, navigation, and design, while app quality was rated by engagement, aesthetics, functionality, and information.”[(4)](https://www.zotero.org/google-docs/?OmaTmz).</p><p><b>Uso (scanner)</b> : El scanner usará sensores y proyecta una luz infrarroja con el objetivo de escanear el código de barras de un determinado grupo de productos previamente registrado, toda la información que reciba será recepcionada y envíada vía WIFI o bluetooth a la APP.</p></td><td valign="top"><p></p><p></p><p></p><p></p><p>LN y MS</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">D</td><td valign="top"><p><b>Mantenimiento:</b>  </p><p>Se incluyen  actualizaciones de forma secuencial en la app con el fin de mejorar y ver posibles problemas iniciales en la app.</p><p></p><p></p><p>Los componentes del escáner: se estila el reemplazo de estos,   inmediatamente después de verificar si algún  componente tiene falla .</p></td><td valign="top"><p></p><p>`       `JR</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><p><b>Costos:</b> Considerando el uso de un scanner con un precio por unidad de s/ 164 más el costo de el desarrollo de nuestra aplicación con un estimado  por sus componentes( [rapicompra peru.com](http://rapicomprasperu.com), 2025 ) :</p><p>- Usando herramientas como MIT App Inventor, Modular, o incluso Flutter Flow (low-code).</p><p>- Arduino: 164 (placa + lector código de barras + cámara básica).</p><p>- Desarrollo de la app (ustedes mismos con soporte open source): costo ≈ 600 ,dependiendo si se contrata algún apoyo para diseño gráfico, (open source, 2025).</p><p>Con un total de s/ 764 y tocando a s/191 por integrante del grupo.</p></td><td valign="top"><p></p><p></p><p></p><p></p><p>LN</p></td></tr>
<tr><td valign="top"><b>25/09/25</b></td><td valign="top">E</td><td valign="top"><b>Plazos:</b> El proyecto empieza el miércoles 25 de septiembre y  espera su finalización el miércoles 9 de diciembre a las 8 a.m. con un total aproximado de 138 horas de trabajo. Se elaboró un diagrama de Gantt para observar el flujo de trabajo, marcando las sustentaciones y entregas principales con hitos marcados.</td><td valign="top"><p></p><p>MS , LN y YK</p></td></tr>
</table>






**Bibliografía**:



[1.	Zheng J, Li J, Ding Z, Kong L, Chen Q. Recognition of expiry data on food packages based on improved DBNet. Connect Sci. 31 de diciembre de 2023;35(1):1-16.](https://www.zotero.org/google-docs/?MO0WVE)

[2.	](https://www.zotero.org/google-docs/?MO0WVE)MIT App Inventor. (2023). *Getting Started with App Inventor*. <https://appinventor.mit.edu>

[3.	De Nerol I, Putra Syam Satria R, Rasyid Parmana R, Octavia N, Mukti Darmawan MD, Mohamad Alvin Renaldi M, et al. IoT-Based Barcode Scanning System for Production and Warehouse Management. J Appl Sci Technol Humanit. 28 de febrero de 2024;1(1):72-86.](https://www.zotero.org/google-docs/?MO0WVE)

[4.	Haas R, Aşan H, Doğan O, Michalek CR, Karaca Akkan Ö, Bulut ZA. Designing and Implementing the MySusCof App—A Mobile App to Support Food Waste Reduction. Foods. enero de 2022;11(15):2222.](https://www.zotero.org/google-docs/?MO0WVE)

6\.  RapiComprasPeru. (s. f.). *Compra rápido y fácil desde cualquier parte del Perú*. Recuperado de[ ](https://rapicomprasperu.com/?utm_source=chatgpt.com)<https://rapicomprasperu.com>

7\. Perú. (2011). *Ley de Seguridad y Salud en el Trabajo*. Ley Nº 29783: <https://diariooficial.elperuano.pe/Normas/obtenerDocumento?idNorma=38>

8 .ISO. (2023). *ISO 24553:2023 – Ergonomics — Accessible design — Controls, actuators and operability: minimum specifications*. International Organization for Standardization. <https://www.iso.org/standard/82984.html> 






