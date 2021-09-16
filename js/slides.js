const myslide = document.querySelectorAll('.myslide'); //Obtiene todos elementos del HTML con la clase .mySlide
const next = document.getElementById("next"); //Obtiene el botón de siguiente por id
const prev = document.getElementById("prev");// Obtien el botón de anterior por id

/**************************INICIALIZA EL LOADER************************************/
window.addEventListener("load",function(){
    document.getElementById("loader").classList.toggle("loader2");
})
/**************************CARGA PANTALLA CON EL BIENVENIDO*****************************/
const welcome = document.getElementById('welcome'); //Obtiene todos elementos del HTML con la clase .mySlide
const btnComenzar = document.getElementById('btn-comenzar');
function hiddenWelcome(){ //Función para ocultar la pantalla de bienvenido
    welcome.style.display = "none"; // Oculta los slides posición por posición
	btnComenzar.style.display = "none";
    // welcome[0].style.zIndex = "1"; // Oculta los slides posición por posición
}
/****************************CAMBIA DE SLIDES***************************************/
let counter = init(); // Captura el valor de la página actual
counter = parseInt(counter); //Pasa  el valor de counter de string a entero
slidefun(counter); // Llama la función slide fun con parametro counter para cambiar de slide

function plusSlides(n) { //Recibe como parametro n de los botones para atrasar  o adelantar los slides
	counter += n; //Le aumenta o disminuye al contador para adelantar o retroceder
	slidefun(counter); //Llama la función slide fun con parametro counter para cambiar de slide
}

function currentSlide(n) { // Función que recibe la página actual y la envía a través de  la funcion slidefun
	counter = n; // counter recibe el parametro
	slidefun(counter); // Se envía counter a slide fun para pasar la página
}

function slidefun(n) { //Función para pasar el slide
	let i; //
	for (i = 0; i < myslide.length; i++) { //  For para recorrer todos los slides
		myslide[i].style.display = "none"; // Oculta los slides posición por posición
	}
	if (n >= myslide.length) { // Condicional para preguntar si está en la última página
		next.style.display = "none"; // Oculta el botón de siguiente
		completeStatusLesson(); // Envia el estado completado al SCORM
	} else {
		next.style.display = "block"; // Aparece el botón de siguiente
	}
	if (n <= 1) { //Condición para  validar si está en la primera página
		prev.style.display = "none"; // Oculta e botón de anteior si está en la primera página
	} else {
		prev.style.display = "block"; // Aparece el botón de anterior si no está en la primera página
	}
	myslide[counter - 1].style.display = "block"; // Aparece el slide actual
}
/****************ABRIR Y CERRAR MENÚ******************* */
const menuToggle =document.getElementById('menu-toggle');
const show=  document.getElementById('show');
const shut=  document.getElementById('shut');
let sideBar=document.getElementById('side-bar');

menuToggle.addEventListener('click',function(){
    //CON TOGGLE CADA CLICK SE AÑADE O SE QUITA LA CLASE DEPENDIENDO SU ESTADO
    //SE OBTIENE EL ELEMENTO SIDE-BAR PARA DESPLEGAR EN PANTALLA COMPLETA
    
    //SE LE DA LA CLASE ACTIVE A SIDEBAR PARA EN CSS DESPLEGARLA
    sideBar.classList.toggle('active');
    //SE DA LA CLASE ACTIVE PARA OCULTAR LAS BARRAS Y MOSTRAR LA X Y VICEVERSA
    show.classList.toggle('active');
    shut.classList.toggle('active');
})
/***********************MENÚ*******************************************/
let nameSlides = []; //Crea un array llamado nameSlides para llenarlo con el contenido dentro del div
const titles = document.querySelectorAll('.title'); //Titles obtiene todos los elementos de html que contiene la clase title

for (let i = 0; i < myslide.length; i++) { // Llena el array nameSlide con el titulo de cada slidep para mostrarlos en el menú
	nameSlides[i] = titles[i].textContent;
}

const slideList = document.getElementById('slideList'); //  slideList obtiene por id para poder agregar LI  dentro de los UL
const fragment = document.createDocumentFragment(); //Fragment adquieres la función de crear fragmentos

for (const nameSlide of nameSlides) { // Crea los elementos LI de forma dínamica dependiento los slides
	const slideList = document.createElement('LI');
	slideList.textContent = nameSlide;
	fragment.appendChild(slideList);
}

console.log(fragment);
slideList.appendChild(fragment);

let li = document.getElementsByTagName("li");

for (let i = 1; i <= nameSlides.length; i++) {// Se les da clases a los LI para poder darles estilos con css
	li[i - 1].classList.add("seccion", "seccion" + i);
}

const seccion = document.querySelectorAll('.seccion'); //Obtiene todos los elementos de la lista
console.log(seccion);

let actual = 0;
for (let i = 0; i < nameSlides.length; i++) { //Agrega el evento de click a todos los elementos de la lista para que envíe la página
	seccion[i].addEventListener("click", function () {
		enviarPagina(i);
		sideBar.classList.toggle('active');
    //SE DA LA CLASE ACTIVE PARA OCULTAR LAS BARRAS Y MOSTRAR LA X Y VICEVERSA
		show.classList.toggle('active');
		shut.classList.toggle('active');
	});
}

function enviarPagina(i) {//Función para enviar la página a la función currentSlide y cambie de página recibiendo i para saber qué botón estoy clickeando
	actual = i + 1;
	actual = parseInt(actual);
	console.log("Estoy enviando la pagina:" + actual);
	currentSlide(actual); //Envía actual a currentSlide para que se actualice la página que estoy tocando
	countSlider = actual; //Sincroniza las variables para que muestren el mismo progreso
}

/**************************PORCENTAJE********************************/
next.addEventListener("click", siguiente);
prev.addEventListener("click", anterior);

/* let numSlides = myslide.length; */ //DIGITAR EL NÚMERO DE SLIDES
let countSlider = counter; // CONTADOR DE SLIDES

let porcentaje = 0;
let sliderAnterior = countSlider;

function siguiente() {

	if (countSlider < myslide.length) {

		countSlider++;
		console.log(countSlider);

		if (sliderAnterior > countSlider) {

		} else {
			sliderAnterior = countSlider;
			calcularPorcentaje();
		}
	}
}

function anterior() {
	if (countSlider > 0) {
		countSlider--;
		console.log(countSlider);
	}
}

function calcularPorcentaje() {
	porcentaje = (countSlider * 100) / myslide.length;
	porcentaje = porcentaje.toFixed(1);
	console.log(porcentaje);
	modifyScoreRaw(porcentaje);
}