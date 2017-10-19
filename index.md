<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
<script type="text/javascript" src="https://d3js.org/d3.v4.min.js"></script>
  
## Aptitud agrícola en Colombia
La [Unidad de Planificación Rural Agropecuaria - UPRA](http://upra.gov.co/), dentro de sus actividades de ordenamiento productivo, produce mapas de zonificación de cadenas productivas. Estos mapas permiten ver independientemente la aptitud para cada producto, la siguiente visualización pretende mostrar en un solo vistazo, la aptitud de todos los productos agrícolas encontrados su sistema de información - [SIPRA](http://upra.gov.co/SIPRA/) relacionandola con cada uno de los departamentos, esto permite identificar:

- Productos con aptitud en varios departamentos.
- Productos con baja aptitud en el territorio nacional.
- Departamentos con poca relación de aptitud de productos agropecuarios.
- Departamentos con aptitud para gran cantidad de productos agopecuarios.

Para mayor claridad, se presenta una imagen se ilustra la forma de presentar la zonificación de aptitud para cacao en el [SIPRA](http://upra.gov.co/SIPRA/), allí se puede observar el comportamiento de la aptitud en todo el territorio nacional.

![caucho](assets/img/zonificacionCaucho.png "tomada de upra.gov.co)

_fuente: https://drive.google.com/file/d/0B41eMRb76ohELXJUR2o0SzFITk0/view_


You can use the [editor on GitHub](https://github.com/JofreManchola/aptitud-agricola-colombia/edit/master/README.md) to maintain and preview the content for your website in Markdown files.


<button id="sideBySide" type="button" class="btn btn-outline-primary btn-sm">Separación lateral</button>
<button id="radialDepartamento" type="button" class="btn btn-outline-success btn-sm">Radial departamentos</button>
<button id="radioAgricola" type="button" class="btn btn-outline-info btn-sm">Radial productos agrícolas</button>

<svg width="690" height="580"></svg>
<script src="assets/js/main.js"></script>

### Más información
Para mayor información puede visitar el sitio web de la UPRA ([http://upra.gov.co/](http://upra.gov.co/)) o su [Sistema de Información para la Planificación Rural Agropecuaria - SIPRA](http://upra.gov.co/SIPRA/).


