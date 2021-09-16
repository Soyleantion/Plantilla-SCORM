/**************************SCORM FUNCTIONS********************************/
var scorm = pipwerks.SCORM; // Scorm obtiene todos los atributos de pipwerk.SCORM para mejor entendimiento


//Scorm para inicializar el curso y retorna la página actual
function init() {
	scorm.version = "1.2"; //Detecta la versión del scorm en este caso scorm 1.2
	alert("Iniciando el Curso."); //Genera una alerta indicando que se inicializa el curso
	var callSucceeded = scorm.init();// Inicializa el curso
	var currentPage = goToPage(); // Llama la función goToPage para indicar la página con la que debe inicializar el curso
	alert("Curso iniciado correctamente? " + callSucceeded + "Debería mostrar esta página:" + currentPage);//Indica si el curso se inició correctamente y la página que debería mostar
	
	return currentPage; //Retorna la página actual traida de la función goToPage
}

function completeStatusLesson() {//Función para cambiar la variable status a completado
	alert("Marcando curso como Completado.");//Genera una alerta indicando que se va a completar el curso
	var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");// Modifica la variable en el scorm cmi.core.lesson_status y le envía un valor completed
	alert("Curso Completado? " + callSucceeded); //Genera una alerta para indicar si el curso se completo en el scorm
}

function incompleteStatusLesson() {//Función para cambiar la variable status a incompleto
	alert("Marcando curso como Incompleto");//Genera una alerta indicando que se va incompletar el curso
	var callSucceeded = scorm.set("cmi.core.lesson_status", "incomplete");//Modifica la variable en el scorm cmi.core.lesson_status y le envía un valor incompleted
	alert("Curso incompleto " + callSucceeded); //Genera una alerta para indicar si el curso se incompleto en el scorm
}

function getNameStudent() {//Función para obtener el nombre del estudiante
	var userName = scorm.get("cmi.core.student_name"); // Captura el nombre del estudiante en la variable userName
	document.getElementById('Nombre').innerHTML = '<b>' + userName + '</b>'; //Me escribe el nombre del estudiante en un div del HTML
}

function getStatusLesson() {//Función para obtener estado del curso
	var callSucceeded = scorm.get("cmi.core.lesson_status"); //Obtiene el valor de la variable status lesson
	alert(callSucceeded); // Muestra el estado del curso
}

function modifyLocationLesson() {//Función para modificar location actual y se pueda entrar a  reaunudar el curso
	var callSucceeded = scorm.set("cmi.core.lesson_location", countSlider+1); //Modifica la variable en el scorm cmi.core.lesson_location y le envía un valor de slider
	console.log("Current Location:" + callSucceeded); // Muestra por consola la locaciton
}

function showLocationLesson() {// Función para motrar la location actual
	var callSucceeded = scorm.get("cmi.core.lesson_location");// Obtiene la location actual
	console.log("Ultima página guardada:" + callSucceeded);// Muestra por consola la location actual
}
function modifyScoreRaw(porcentaje){// Función  para modificar el score del curso
	var callSucceeded = scorm.set("cmi.core.score.raw", porcentaje); // Se modifica el score del curso
	console.log ("Se cambió el Score Raw?:" + callSucceeded); // Se muestra por consola si el cambio fue exitoso
	callSucceeded = scorm.get("cmi.core.score.raw"); //Obtiene el nuevo valor del porcentaje
	console.log ("Nuevo porcentaje adquirido:" + callSucceeded ); //Muestra por consola el valor del porcentaje
}

function modifyStatusSucces(){// Función para modificar el suceso del curso
	var callSucceeded = scorm.set("cmi.core.success_status", "completed"); // Cambia el suceso del curso a "completed"
	console.log ("Se cambio el 'sucess' del curso?: " + callSucceeded); // Se muestra por consola si el cambio fue exitoso
}

function end() { //Función para finalizar la conexión con el Scorm
	alert("Conexion terminada."); // Muestra un alert para indicar que se terminó la conexión
	var callSucceeded = scorm.quit(); // Llama el atributo para terminar la conexión
	alert("Termino correctamente? " + callSucceeded); // Muestra por alert que se termino la conexión correctamente
}


function goToPage() { // Función utilizada en "function init();" para redireccionar los slides
	var paginaActual = scorm.get("cmi.core.lesson_location"); // Almacena el valor de la location actual en la variable "paginaActual"
	console.log("Esto está mostrando página actual:   " + paginaActual); // Muestra por consola la variable "paginaActual" para indicar que valor está mostrando
	if (paginaActual == 'null' || paginaActual == '') { //Condición para saber si el estudiante ya ha ingresado al curso
		console.log("BIENVENIDO AL CURSO POR PRIMERA VEZ:  true"); // Si el usuario ingresa por primera vez muestra un console.log de bienvenido
		paginaActual = 1; //Le asigna a paginaActual el valor de 1 para redireccionar al primer slide
	} else {// Por falso  preguntamos si desea reanudar el curso donde lo dejó
		let option = confirm("Desea reanudar el curso?"); //Alert confirm para preguntar si desea reanudar el curso o no

		if (option == true) {
			hiddenWelcome();
		}// Si desea reanudar el curso simplemente envía la variable "paginaActual" para redireccionar
		else { //Si no desea reanudar el curso le asigna 1 a "paginaActua"  para que lo redireccione al slide1
			paginaActual = 1; // Asigna 1 a la variable "paginaActual"
			scorm.set("cmi.core.lesson_status", "incomplete"); //Cambia el estado del curso a incomplete
		}
	}
	return paginaActual; //Retorna el slide en el que quiero mostrar el curso dependiendo las decisiones
}

/* window.onload = function (){
	init();
} */

window.onunload = function () {//Función para finalizar la conexión con el Scorm
	end();//Llama la funcion end que finaliza la conexión
}