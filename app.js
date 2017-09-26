/*global moment*/
(function() {
	'use strict';
	setInterval(() => {
		const time = moment();
		const now = {
			hours: parseInt(time.format('h'), 10),
			minutes: parseInt(time.format('m'), 10),
			am_pm: time.format('a'),
		};
		const elements = getElements(now);
		const toRemove = diffArray(getPrevElements(), elements);
		toRemove.map(el => {
			document.getElementById(el).classList.remove('on');
		});
		elements.map(el => {
			document.getElementById(el).classList.add('on');
		});
	}, 1000);

	const getPrevElements = () => {
		const prev = document.getElementsByClassName('on');
		let prevEl = [];
		if (prev.length > 0) {
			for (let i = 0; i < prev.length; i++) {
				prevEl = prevEl.concat(prev[i].id);
			}
		}
		return prevEl;
	};

	const getElements = now => {
		let elements = [];
		elements = elements.concat(getHourElements(now));
		elements = elements.concat(getMinuteElements(now));
		elements = elements.concat(getAmPmElements(now));
		return elements;
	};

	const getMinuteElements = now => {
		let elements = [];
		let minutes = 0;
		if (now.minutes > 0) {
			if (now.hours != 12) {
				elements = elements.concat(['e1', 'minuto']);
			}
			else {
				elements = elements.concat('minuto');
			}

			if (now.minutes > 1) {
				elements = elements.concat('s6');
			}
			if (now.minutes >= 1 && now.minutes < 10) {
				elements = elements.concat('e2');
				minutes = now.minutes;
			}
			if (now.minutes === 10) {
				elements = elements.concat('m_dez');
			}
			if (now.minutes > 10 && now.minutes < 20) {
				switch (now.minutes) {
					case 11:
						elements = elements.concat('m_onze');
						break;
					case 12:
						elements = elements.concat('m_doze');
						break;
					case 13:
						elements = elements.concat('m_treze');
						break;
					case 14:
						elements = elements.concat('m_catorze');
						break;
					case 15:
						elements = elements.concat('m_quinze');
						break;
					case 16:
						elements = elements.concat('m_dezesseis');
						break;
					case 17:
						elements = elements.concat('m_dezessete');
						break;
					case 18:
						elements = elements.concat('m_dezoito');
						break;
					case 19:
						elements = elements.concat('m_dezenove');
						break;
				}
			}
			if (now.minutes >= 20 && now.minutes < 30) {
				elements = elements.concat('m_vinte');
				if (now.minutes > 20) {
					elements = elements.concat('e2');
					minutes = now.minutes - 20;
				}
			}
			if (now.minutes >= 30 && now.minutes < 40) {
				elements = elements.concat('m_trinta');
				if (now.minutes > 30) {
					elements = elements.concat('e2');
					minutes = now.minutes - 30;
				}
			}
			if (now.minutes >= 40 && now.minutes < 50) {
				elements = elements.concat('m_quarenta');
				if (now.minutes > 40) {
					elements = elements.concat('e2');
					minutes = now.minutes - 40;
				}
			}
			if (now.minutes >= 50) {
				elements = elements.concat('m_cinquenta');
				if (now.minutes > 50) {
					elements = elements.concat('e2');
					minutes = now.minutes - 50;
				}
			}
			switch (minutes) {
				case 1:
					elements = elements.concat('m_um');
					break;
				case 2:
					elements = elements.concat(['m_dois', 's5']);
					break;
				case 3:
					elements = elements.concat(['m_tres', 's4']);
					break;
				case 4:
					elements = elements.concat('m_quatro');
					break;
				case 5:
					elements = elements.concat(['m_cinco', 'o3']);
					break;
				case 6:
					elements = elements.concat(['m_seis', 's4']);
					break;
				case 7:
					elements = elements.concat(['m_sete', 's5']);
					break;
				case 8:
					elements = elements.concat(['m_oito', 'o3']);
					break;
				case 9:
					elements = elements.concat('m_nove');
					break;
			}
		}
		return elements;
	};

	const getAmPmElements = now => {
		if (now.hours === 12) return [];
		if (now.am_pm === 'am') return ['da', 'da_manha'];
		if (now.hours < 6) return ['da', 'da_tarde'];
		return ['da', 'da_noite'];
	};

	const getHourElements = now => {
		switch (now.hours) {
			case 1:
				return ['um', 'hora'];
			case 2:
				return ['dois', 's2', 'hora', 's3'];
			case 3:
				return ['tres', 's1', 'hora', 's3'];
			case 4:
				return ['quatro', 'o1', 'hora', 's3'];
			case 5:
				return ['cinco', 'o2', 'hora', 's3'];
			case 6:
				return ['s2', 'seis', 'hora', 's3'];
			case 7:
				return ['s1', 'sete', 'hora', 's3'];
			case 8:
				return ['o1', 'oito', 'hora', 's3'];
			case 9:
				return ['nove', 'hora', 's3'];
			case 10:
				return ['dez', 'hora', 's3'];
			case 11:
				return ['o2', 'onze', 'hora', 's3'];
			case 12:
				if (now.am_pm === 'am') {
					return ['meia', 'noite'];
				}
				return ['meio', 'dia'];
		}
	};

	const diffArray = (arr1, arr2) => {
		let newArr = [];
		let myArr = arr1.concat(arr2);
		newArr = myArr.filter(function(item) {
			return arr2.indexOf(item) < 0 || arr1.indexOf(item) < 0;
		});
		return newArr;
	};
})();
