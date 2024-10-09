document.addEventListener('DOMContentLoaded', function () {
	const questions = [
		{
			text: "IMPEDÍ QUE MI HIJO COMPRE O SE VISTA CON COLORES ROSADO, LILA, TURQUEZA, ETC.",
			correctAnswer: true
		},
		{
			text: "CUANDO HE VISTO A MI HIJO REALIZANDO LAS RESPONSABILIDADES DOMESTICAS (BARRER, LAVAR LOS TRASTES, LAVAR LA ROPA ETC.), LE LLAMO O LE HE LLAMADO LA ATENCION Y LE DIGO QUE ESO NO ES PARA HOMBRES.",
			correctAnswer: true
		},
		{
			text: "LE HE GRITADO A MI HIJO CUANDO VIENE DEL COLEGIO CON LA CARA TRISTE, PORQUE EN SU COLEGIO UN COMPAÑERO LE HACE BULLYNG, Y NO SE DEFENDIÓ.",
			correctAnswer: true
		},
		{
			text: "ME MOLESTA CUANDO PIDO A MI HIJO APOYO PARA HACER ACTIVIDADES QUE DEMANDAN ESFUERZO FISICO, Y MENCIONA QUE NO PUEDE PORQUE NO TIENE FUERZA.",
			correctAnswer: true
		},
		{
			text: "ME ALEGRO, CUANDO VEO A MI HIJO JUGAR TOSCAMENTE CON SU AMIGOS.",
			correctAnswer: true
		},
		{
			text: "ME HE ENOJADO CUANDO MI HIJA SE PONE A JUGAR FUTBOL, PORQUE CONSIDERO QUE LAS HIJAS TIENEN QUE HACER OTROS JUEGOS MAS DOCILES.",
			correctAnswer: true
		},
		{
			text: "CONSIDERO QUE UN NIÑO MIENTRAS MAS FUERTE SEA, SERA MAS HOMBRE.",
			correctAnswer: true
		},
		{
			text: "LE HE DICHO A MI HIJO QUE UN VERDADERO HOMBRE ES EL QUE SABE IMPONER SU AUTORIDAD ANTE SU ESPOSA E HIJOS.",
			correctAnswer: true
		},
		{
			text: "LE HE DICHO A MI ESPOSA O LE HE INSINUADO QUE ELLA ES LA PRINCIPAL RESPONSABLE POR LA CRIANZA DE NUESTROS HIJOS E HIJAS.",
			correctAnswer: true
		},
		{
			text: "LE HE DICHO A MI ESPOSA, QUE ES LA MUJER IDEAL PORQUE ATIENDE Y SE PREOCUPA DE SU FAMILIA. ",
			correctAnswer: true
		},
		{
			text: "HE MANTENIDO A MI FAMILIA, Y LES DOY A MIS HIJOS E HIJAS TODO LO QUE NO PUDE TENER DE NIÑO.",
			correctAnswer: true
		},
		{
			text: "HE PENSADO QUE LAS LABORES DOMÉSTICAS, SOLO LO DEBEN DE APRENDER LAS MUJERES DESDE NIÑAS.",
			correctAnswer: true
		},
		{
			text: "HE FELICITADO A MI PAREJA POR ENSEÑAR A MIS HIJAS LABORES DOMÉSTICAS, PORQUE CUANDO TENGAN ESPOSOS O PAREJAS, ELLOS SERÁN FELICES CON ELLAS.",
			correctAnswer: true
		},
		{
			text: "ME HE CONVENCIDO QUE LAS LABORES DOMÉSTICAS, NO SON PARA LOS VARONES. ",
			correctAnswer: true
		},
		{
			text: "HE TENIDO HIJOS FUERA DEL MATRIMONIO.",
			correctAnswer: true
		},
		{
			text: "LE HE DICHO A MI HIJO, QUE LOS HOMBRES NO LLORAN Y NO SE QUEJAN.",
			correctAnswer: true
		},
		{
			text: "ME HE MOLESTADO MUCHO CUANDO HE VISTO A MI HIJO JUGAR CON JUGUETES PARA NIÑAS.",
			correctAnswer: true
		},
		{
			text: "ME HA SIDO DIFICIL MOSTRAR TERNURA A MI HIJO, PORQUE ES SINONIMO DE DEBILIDAD.",
			correctAnswer: true
		},
		{
			text: "CUANDO MI BEBE LLORA DESPIERTO A MI PAREJA PARA QUE LO ATIENDA, PORQUE YO ESTOY MUY CANSADO DE ESTAR TODO EL DÍA TRABAJANDO, Y ADEMÁS LAS MUJERES SON MEJORES PARA LA CRIANZA DE LOS HIJOS.",
			correctAnswer: true
		},
		{
			text: "ME HE CONVENCIDO QUE EL CUIDADO DE MIS HIJOS E HIJAS, ES UNA CARGA, PARA ESO ESTAN LAS MADRES, QUE POR NATURALEZA SON MEJORES PARA LA CRIANZA.",
			correctAnswer: true
		},
		{
			text: "HE IMPUESTO MI AUTORIDAD Y DISCIPLINA CON MIS HIJOS E HIJAS.",
			correctAnswer: true
		}
	];

	let carousel;
	let currentQuestion = 0;
	let answers = [];

	const calculateScore = (answers) => {
		const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer);
		return (correctAnswers.length / questions.length) * 100;
	};

	const getResult = (score) => {
		if (score < 33) return 'malo';
		if (score < 66) return 'regular';
		return 'bueno';
	};

	const renderTemplate = (templateId, data) => {
		const template = document.getElementById(templateId);
		const clone = template.content.cloneNode(true);

		Object.keys(data).forEach(key => {
			const element = clone.querySelector(`[data-${key}]`);
			if (element) {
				element.textContent = data[key];
			}
		});

		return clone;
	};

	const showCarousel = () => {
		document.getElementById('questionCarousel').style.display = 'block';
		document.getElementById('section-info-machometro').style.display = 'none';
	};

	const hideCarousel = () => {
		document.getElementById('questionCarousel').style.display = 'none';
		document.getElementById('section-info-machometro').style.display = 'block';
	};

	const renderQuestion = (questionNumber, questionText) => {
		const questionData = {
			'question-number': questionNumber + 1,
			'question-text': questionText
		};
		const questionElement = renderTemplate('question-template', questionData);
		const carouselItem = questionElement.querySelector('.carousel-item');
		if (carouselItem) {
			if ( questionNumber === 0)
			carouselItem.classList.add('active');
			document.querySelector('.carousel-inner').appendChild(carouselItem);
		}
	};

	const renderResult = (score, resultType) => {
		const templateId = `resultado-${resultType}-template`;
		const resultData = {
			'result-score': `Obtuviste ${score.toFixed(1)}% de respuestas correctas`
		};
		const resultElement = renderTemplate(templateId, resultData);
		const carouselItem = resultElement.querySelector('.carousel-item');
		if (carouselItem) {
			document.querySelector('.carousel-inner').appendChild(carouselItem);
		}
	};

	const handleAnswer = (answer) => {
		answers.push(answer);
		currentQuestion++;

		if (currentQuestion < questions.length) {
			carousel.to(currentQuestion);
		} else {
			const score = calculateScore(answers);
			const resultType = getResult(score);
			renderResult(score, resultType);
			carousel.to(questions.length);
		}
	};

	const initializeCarousel = () => {
		const carouselElement = document.getElementById('questionCarousel');
		carousel = new bootstrap.Carousel(carouselElement, {
			interval: false,
			wrap: false,
			touch: false,
			keyboard: false
		});

		carouselElement.addEventListener('slide.bs.carousel', function (e) {
			if (e.to !== currentQuestion && e.to !== questions.length) {
				e.preventDefault();
			}
		});
	};

	const setupQuestionButtons = () => {
		document.querySelector('.carousel-inner').addEventListener('click', function (event) {
			const button = event.target.closest('[data-answer]');
			if (button) {
				const answer = button.getAttribute('data-answer') === 'yes';
				handleAnswer(answer);
			}
		});
	};

	const runTest = () => {
		showCarousel();
		const carouselInner = document.querySelector('.carousel-inner');
		carouselInner.innerHTML = '';
		currentQuestion = 0;
		answers = [];

		questions.forEach((question, index) => {
			renderQuestion(index, question.text);
		});

		initializeCarousel();
		setupQuestionButtons();
	};

	const startTestButton = document.getElementById('startTest');
	if (startTestButton) {
		startTestButton.onclick = runTest;
	}
});